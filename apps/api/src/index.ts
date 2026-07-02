import app from "./app";
import { env } from "./config/env";
import { redis } from "./infrastructure/redis/client";

async function bootstrap() {
  try{
    await redis.ping();

    app.listen(env.PORT, () => {
      console.log(`API is listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to Connect to Redis");
    process.exit(1);
  }
}

bootstrap();