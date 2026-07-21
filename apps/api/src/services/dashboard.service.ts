import { redis } from "../infrastructure/redis/client";

export class DashboardService {
  async getMetrics() {
    const keys = await redis.keys("jobflow:jobs:*");

    const jobs = await Promise.all(
      keys.map((key) => redis.hgetall(key))
    );

    let queued = 0;
    let processing = 0;
    let completed = 0;
    let failed = 0;
    let retries = 0;

    for (const job of jobs) {
      switch (job.status) {
        case "QUEUED":
          queued++;
          break;

        case "PROCESSING":
          processing++;
          break;

        case "COMPLETED":
          completed++;
          break;

        case "FAILED":
          failed++;
          break;
      }

      retries += Number(job.attempts ?? 0);
    }

    return {
      queued,
      processing,
      completed,
      failed,
      retries,

      // we'll improve this later
      workers: 4,
    };
  }
}