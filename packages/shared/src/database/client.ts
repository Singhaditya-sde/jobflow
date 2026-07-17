import { Pool } from "pg";

export const postgres = new Pool({
  host: "localhost",
  port: 5432,
  user: "jobflow",
  password: "jobflow",
  database: "jobflow",
});

export async function connectDatabase() {
  try {
    const client = await postgres.connect();
    console.log("PostgreSQL Connected");

    client.release();
  } catch (error) {
    console.error("PostgreSQL Connection Failed");
    console.error(error);
    process.exit(1);
  }
}