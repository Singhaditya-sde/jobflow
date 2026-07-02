import "dotenv/config";

export const env = {
  PORT: Number(process.env.PORT || 3000),
  REDIS_HOST: process.env.REDIS_HOST ?? "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
}