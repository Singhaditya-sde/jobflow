export type JobStatus =
  | "QUEUED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "RETRYING";

export interface Job {
  id: string;
  type: string;
  status: JobStatus;
  priority: number;
  worker?: string;
  attempts?: number;
  createdAt: string;
  updatedAt?: string;
}