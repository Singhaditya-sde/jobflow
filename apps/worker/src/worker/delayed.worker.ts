import { DelayedWorkerService } from "../services/delayed-worker.service";
import { sleep } from "../utils/sleep";

export async function startDelayedWorker() {
  const delayedWorker = new DelayedWorkerService();

  console.log("Delayed Worker Started");

  while (true) {
    await delayedWorker.process();
    await sleep(1000);
  }
}