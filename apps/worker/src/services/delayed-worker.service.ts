import { redis } from "../infrastructure/redis/client";

export class DelayedWorkerService {
  async process() {
    const now = Date.now();

    const jobs = await redis.zrangebyscore(
      "jobflow:delayed",
      0,
      now
    );

    for (const jobId of jobs) {
      // Get the original job metadata
      const job = await redis.hgetall(
        `jobflow:jobs:${jobId}`
      );

      const removed = await redis.zrem(
      "jobflow:delayed",
      jobId
      );

      if (removed === 0) {
          continue;
      }

      await redis.zadd(
          "jobflow:queue",
          Number(job.priority),
          jobId
      );

      console.log(
        `Moved ${jobId} back to queue`
      );
    }
  }
}