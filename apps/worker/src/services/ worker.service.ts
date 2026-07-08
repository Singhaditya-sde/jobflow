import { redis } from "../infrastructure/redis/client";
import { JobStatus, JobType } from "@jobflow/shared";
import { JobStateService } from "../state/job-state.service";
import { SendEmailHandler } from "../handlers/send-email.handler";

export class WorkerService {
  private state = new JobStateService();

  async poll() {
    const result = await redis.zpopmin("jobflow:queue");

    if(result.length === 0) {
      return;
    }

    const [jobId] = result;

    const job = await redis.hgetall(
      `jobflow:jobs:${jobId}`
    );

    if(!job.id) {
      console.log("Job metadata missing");
      return;
    }

    console.log("Job Found");

    await this.state.updateStatus(
      job.id,
      JobStatus.PROCESSING
    );

    console.log("Status -> PROCESSING");

    try{
      switch(job.type) {
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

      console.log("Status -> COMPLECTED");
    } catch (error) {
      await this.state.incrementAttempts(job.id);

      await this.state.saveError(
        job.id,
        (error as Error).message
      );

      await this.state.updateStatus(
        job.id,
        JobStatus.FAILED
      );

      console.log("Status -> FAILED");
    }
  }
}

