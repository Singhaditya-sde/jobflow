import { Request, Response } from "express";
import { redis } from "../infrastructure/redis/client";
import { CreateJob } from "../services/job.service";

export async function createJobController(
  req: Request,
  res: Response
) {
  try {
    const { type, priority, payload } = req.body;

    if (!type || !payload) {
      return res.status(400).json({
        success: false,
        message: "type and payload are required",
      });
    }

    const job = await CreateJob({
      type,
      priority: priority ?? 1,
      payload,
    });

    return res.status(201).json({
      success: true,
      jobId: job.id,
      status: job.status,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getJobController(
  req: Request,
  res: Response
) {
  try {
    const job = await redis.hgetall(
      `jobflow:jobs:${req.params.id}`
    );

    if (Object.keys(job).length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}