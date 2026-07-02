import { redis } from "../infrastructure/redis/client"
import { generateJobId } from "../utils/id";

export interface CreateJobDto {
  type: string;
  priority: number;
  payload: Record<string, unknown>;
}

export async function CreateJob(data: CreateJobDto) {

  const job = {
    id: generateJobId(),
    type: data.type,
    payload: data.payload,
    priority: data.priority,
    status: "Queued",
    attempts: 0,
    createdAt: new Date().toISOString(),
  };

  await redis.zadd(
    "jobflow:queue",
    job.priority,
    JSON.stringify(job)
  );

  return job;
}