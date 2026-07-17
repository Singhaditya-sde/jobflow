import { Pool } from "pg";

export const postgres = new Pool({
  host: "localhost",
  port: 5432,
  user: "jobflow",
  password: "jobflow",
  database: "jobflow",
});