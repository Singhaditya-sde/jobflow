import { redis } from "../infrastructure/redis/client";
import { JobStatus, JobType } from "@jobflow/shared";
import { RetryService } from "./retry.service";
import { DelayedQueueService } from "./delayed-queue.service";
import { JobStateService } from "../state/job-state.service";
import { SendEmailHandler } from "../handlers/send-email.handler";
import { WORKER_ID } from "../utils/worker-info";
import { workerMetrics } from "../utils/worker-metrics";
import {
  jobsCompletedTotal,
  jobsFailedTotal,
  jobsRetryTotal,
} from "../metrics/worker.metrics";

export class WorkerService {
  private state = new JobStateService();
  private retryService = new RetryService();
  private delayedQueue = new DelayedQueueService();

  async poll(): Promise<void> {
    const result = await redis.zpopmin("jobflow:queue");
    if (result.length === 0) {
      return;
    }

    const [jobId] = result;
    const job = await redis.hgetall(
      `jobflow:jobs:${jobId}`
    );

    if (!job.id) {
      console.log(
        `[Worker ${WORKER_ID}] Job metadata missing`
      );
      return;
    }

    console.log(
      `[Worker ${WORKER_ID}] Job Found`
    );

    await this.state.updateStatus(
      job.id,
      JobStatus.PROCESSING
    );

    console.log(
      `[Worker ${WORKER_ID}] Status -> PROCESSING`
    );

    try {
      switch (job.type) {
        case JobType.SEND_EMAIL:
          await new SendEmailHandler().handler({
            ...job,
            payload: JSON.parse(job.payload),
          });
          break;

        default:
          throw new Error("Unknown Job");
      }

      await this.state.updateStatus(
        job.id,
        JobStatus.COMPLETED
      );

      // In-memory metrics
      workerMetrics.processedJobs++;
      // Prometheus metrics
      jobsCompletedTotal.inc();

      console.log(
        `[Worker ${WORKER_ID}] Status -> COMPLETED`
      );

      console.log(
        `[Worker ${WORKER_ID}] Processed Jobs: ${workerMetrics.processedJobs}`
      );

    } catch (error) {
      await this.state.incrementAttempts(job.id);

      await this.state.saveError(
        job.id,
        (error as Error).message
      );

      const updatedJob = await this.state.getJob(
        job.id
      );

      const attempts = Number(updatedJob.attempts);
      const maxAttempts = Number(updatedJob.maxAttempts);

      if (attempts < maxAttempts) {
        const delay =
          this.retryService.getDelay(attempts);

        await this.state.updateStatus(
          job.id,
          JobStatus.RETRYING
        );

        // Prometheus metric
        jobsRetryTotal.inc();

        await this.delayedQueue.schedule(
          job.id,
          delay
        );

        console.log(
          `[Worker ${WORKER_ID}] Retry ${attempts}/${maxAttempts} after ${delay} ms`
        );

      } else {
        // In-memory metrics
        workerMetrics.failedJobs++;
        // Prometheus metrics
        jobsFailedTotal.inc();

        await this.state.updateStatus(
          job.id,
          JobStatus.FAILED
        );

        console.log(
          `[Worker ${WORKER_ID}] Status -> FAILED`
        );

        console.log(
          `[Worker ${WORKER_ID}] Failed Jobs: ${workerMetrics.failedJobs}`
        );
      }
    }
  }
}