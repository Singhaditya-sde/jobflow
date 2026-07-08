import { Worker } from "./worker";

async function bootstrap(): Promise<void> {
  const worker = new Worker();

  await worker.start();
}

bootstrap().catch((error) => {
  console.error("Unhandled Error:", error);
  process.exit(1);
})