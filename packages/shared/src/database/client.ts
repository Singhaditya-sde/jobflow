import { Pool } from "pg";

export const postgres = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function connectDatabase() {
  try {
    const client = await postgres.connect();
    console.log("✅ PostgreSQL Connected");

    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(error);
    process.exit(1);
  }
}