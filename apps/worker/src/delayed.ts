import { startDelayedWorker } from "./worker/delayed.worker";

startDelayedWorker().catch((error) => {
  console.error("Delayed Worker Error:", error);
  process.exit(1);
});