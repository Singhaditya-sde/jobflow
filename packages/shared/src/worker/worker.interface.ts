export interface WorkerInfo {
  id: string;
  status: "IDLE" | "BUSY";
  processedJobs: number;
  failedJobs: number;
  startedAt: string;
}