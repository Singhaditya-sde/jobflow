import { redis } from "../infrastructure/redis/client";

export class JobRepository {
  async findAll() {
    // Get all job keys
    const keys = await redis.keys("jobflow:jobs:*");

    if (keys.length === 0) {
      return [];
    }

    // Read every job
    const jobs = await Promise.all(
      keys.map(async (key) => {
        return await redis.hgetall(key);
      })
    );

    return jobs;
  }
}