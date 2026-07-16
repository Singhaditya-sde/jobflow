export class WorkerMetrics {
  processedJobs = 0;
  failedJobs = 0;
}

export const workerMetrics = new WorkerMetrics();