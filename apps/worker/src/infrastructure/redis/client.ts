import Redis from "ioredis";
import { env } from "../../config/env";

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Worker connected to Redis");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});