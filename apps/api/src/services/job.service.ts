import { JobStatus } from "@jobflow/shared";
import { redis } from "../infrastructure/redis/client";
import { generateJobId } from "../utils/id";

export interface CreateJobDto {
  type: string;
  priority: number;
  payload: Record<string, unknown>;
}

export async function CreateJob(data: CreateJobDto) {
  const jobId = generateJobId();

  const job = {
    id: jobId,
    type: data.type,
    payload: data.payload,
    priority: data.priority,
    status: JobStatus.QUEUED,
    attempts: 0,
    maxAttempts: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Store the job metadata
  await redis.hset(`jobflow:jobs:${jobId}`, {
    id: job.id,
    type: job.type,
    payload: JSON.stringify(job.payload),
    priority: job.priority.toString(),
    status: job.status,
    attempts: job.attempts.toString(),
    maxAttempts: job.maxAttempts.toString(),
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  });

  // Store only the Job ID in the queue
  await redis.zadd(
    "jobflow:queue",
    job.priority,
    job.id
  );

  return job;
}