import { Request, Response } from "express";
import { JobService } from "../services/job.service";

const service = new JobService();

export async function getAllJobsController(
  req: Request,
  res: Response
) {
  try {
    const jobs = await service.getAllJobs();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: (error as Error).message,
    });
  }
}