import app from "./app";
import { env } from "./config/env";
import { redis } from "./infrastructure/redis/client";

async function bootstrap() {
  try {
    await redis.ping();

    app.listen(env.PORT, () => {
      console.log(`🚀 API listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    process.exit(1);
  }
}

bootstrap();