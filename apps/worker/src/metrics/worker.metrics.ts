import { Counter } from "prom-client";
import { register } from "./registry";

export const jobsCompletedTotal = new Counter({
  name: "jobflow_jobs_completed_total",
  help: "Total number of completed jobs",
  registers: [register],
});

export const jobsFailedTotal = new Counter({
  name: "jobflow_jobs_failed_total",
  help: "Total number of failed jobs",
  registers: [register],
});

export const jobsRetryTotal = new Counter({
  name: "jobflow_jobs_retry_total",
  help: "Total number of retried jobs",
  registers: [register],
});