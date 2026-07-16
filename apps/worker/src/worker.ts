import { WorkerService } from "./services/worker.service";
import { WORKER_ID } from "./utils/worker-info";
import { env } from "./config/env";
import { redis } from "./infrastructure/redis/client";
import { sleep } from "./utils/sleep";

export class Worker {
  private readonly workerService = new WorkerService();

  async start(): Promise<void> {
    try {
      await redis.connect();

      console.log(`🚀 Worker ${WORKER_ID} Started`);

      while (true) {
        await this.workerService.poll();
        await sleep(env.Worker.pollInterval);
      }
    } catch (error) {
      console.error(
        `❌ Worker ${WORKER_ID} Startup Failed`,
        error
      );
      process.exit(1);
    }
  }
}