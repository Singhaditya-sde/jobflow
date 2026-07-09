import { redis } from "../infrastructure/redis/client";

export class DelayedQueueService {
  async schedule(jobId: string, delay: number) {
    const retryAt = Date.now() + delay;

    await redis.zadd(
      "jobflow:delayed",
      retryAt,
      jobId
    );

    console.log(
      `Job ${jobId} scheduled after ${delay} ms`
    );
  }
}