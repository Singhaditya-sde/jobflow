import { Request, Response } from "express";
import { JobService } from "../services/job.service";

const service = new JobService();

export async function getAllJobsController(
  req: Request,
  res: Response
) {
  try {
    const jobs = await service.getAllJobs();

    const formattedJobs = jobs.map((job) => ({
      ...job,
      priority: Number(job.priority),
      attempts: Number(job.attempts),
      maxAttempts: Number(job.maxAttempts),
    }));

    return res.status(200).json({
      success: true,
      data: formattedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: (error as Error).message,
    });
  }
}