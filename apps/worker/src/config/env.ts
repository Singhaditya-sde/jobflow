import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  REDIS_URL:
    process.env.REDIS_URL || "redis://localhost:6379",

  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://jobflow:jobflow@localhost:5432/jobflow",

  POLL_INTERVAL: Number(process.env.POLL_INTERVAL) || 1000,
};