import { redis } from "../infrastructure/redis/client";
import { JobStatus } from "@jobflow/shared";

export class JobStateService {
  async updateStatus(
    jobId: string,
    status: JobStatus
  ) {
    await redis.hset(`jobflow:jobs:${jobId}`, {
      status,
      updatedAt: new Date().toISOString(),
    });
  }

  async incrementAttempts(jobId: string) {
    await redis.hincrby(
      `jobflow:jobs:${jobId}`,
      "attempts",
      1
    );
  }

  async saveError(jobId: string, error: string) {
    await redis.hset(
      `jobflow:jobs${jobId}`,
      {
        error,
        updatedAt: new Date().toISOString()
      }
    );
  }
}