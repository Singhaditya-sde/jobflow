import { Pool } from "pg";
import { env } from "../../config/env";

export const postgres = new Pool({
  connectionString: env.DATABASE_URL,
  ssl:
    env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});