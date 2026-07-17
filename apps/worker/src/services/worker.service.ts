import { redis } from "../infrastructure/redis/client";
import {
  JobHistoryRepository,
  JobStatus,
  JobType,
} from "@jobflow/shared";
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

    const job = await redis.hgetall(`jobflow:jobs:${jobId}`);

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

    await JobHistoryRepository.log({
      jobId: job.id,
      status: JobStatus.PROCESSING,
      attempts: Number(job.attempts),
      payload: JSON.parse(job.payload),
    });

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

      workerMetrics.processedJobs++;
      jobsCompletedTotal.inc();

      await JobHistoryRepository.log({
        jobId: job.id,
        status: JobStatus.COMPLETED,
        attempts: Number(job.attempts),
        payload: JSON.parse(job.payload),
      });

      console.log(
        `[Worker ${WORKER_ID}] Status -> COMPLETED`
      );

      console.log(
        `[Worker ${WORKER_ID}] Processed Jobs: ${workerMetrics.processedJobs}`
      );
    } catch (error) {
      const errorMessage = (error as Error).message;

      await this.state.incrementAttempts(job.id);

      await this.state.saveError(
        job.id,
        errorMessage
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

        jobsRetryTotal.inc();

        await JobHistoryRepository.log({
          jobId: job.id,
          status: JobStatus.RETRYING,
          attempts,
          payload: JSON.parse(updatedJob.payload),
          error: errorMessage,
        });

        await this.delayedQueue.schedule(
          job.id,
          delay
        );

        console.log(
          `[Worker ${WORKER_ID}] Retry ${attempts}/${maxAttempts} after ${delay} ms`
        );
      } else {
        workerMetrics.failedJobs++;
        jobsFailedTotal.inc();

        await this.state.updateStatus(
          job.id,
          JobStatus.FAILED
        );

        await JobHistoryRepository.log({
          jobId: job.id,
          status: JobStatus.FAILED,
          attempts,
          payload: JSON.parse(updatedJob.payload),
          error: errorMessage,
        });

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