import { api } from "./axios";
import { type Job } from "@/types/job";

interface JobsResponse {
  success: boolean;
  data: Job[];
}

export async function getJobs() {
  const { data } = await api.get<JobsResponse>("/jobs");
  return data.data;
}