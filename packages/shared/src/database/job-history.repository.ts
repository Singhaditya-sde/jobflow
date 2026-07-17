import { postgres } from "./client";

export class JobHistoryRepository {
  static async log(data: {
    jobId: string;
    status: string;
    attempts: number;
    payload?: unknown;
    error?: string;
  }) {
    await postgres.query(
      `
      INSERT INTO job_history
      (job_id, status, attempts, payload, error)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        data.jobId,
        data.status,
        data.attempts,
        data.payload ? JSON.stringify(data.payload) : null,
        data.error ?? null,
      ]
    );
  }

  static async findByJobId(jobId: string) {
  const result = await postgres.query(
    `
    SELECT
      status,
      attempts,
      payload,
      error,
      created_at
    FROM job_history
    WHERE job_id = $1
    ORDER BY created_at ASC
    `,
    [jobId]
  );

  return result.rows;
  }
}