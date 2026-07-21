import { api } from "./axios";

export interface DashboardMetrics {
  queued: number;
  processing: number;
 completed: number;
  failed: number;
  retries: number;
  workers: number;
}

export async function getDashboardMetrics() {
  const { data } = await api.get("/dashboard/metrics");

  return data.data;
}