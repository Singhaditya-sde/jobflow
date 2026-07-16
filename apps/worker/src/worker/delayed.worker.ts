// import { DelayedWorkerService } from "../services/delayed-worker.service";
// import { sleep } from "../utils/sleep";

// export async function startDelayedWorker() {
//   const delayedWorker = new DelayedWorkerService();

//   console.log("Delayed Worker Started");

//   while (true) {
//     await delayedWorker.process();
//     await sleep(1000);
//   }
// }

import { redis } from "../infrastructure/redis/client";
import { DelayedWorkerService } from "../services/delayed-worker.service";
import { sleep } from "../utils/sleep";

export async function startDelayedWorker() {
  await redis.connect();

  const delayedWorker = new DelayedWorkerService();

  console.log("🚀 Delayed Worker Started");

  while (true) {
    await delayedWorker.process();
    await sleep(1000);
  }
}