import { Request, Response } from "express";
import { JobHistoryService } from "../services/job-history.service";

const service = new JobHistoryService();

export async function getJobHistory(
  req: Request,
  res: Response
) {
  try {
    const history = await service.getHistory(
      req.params.jobId as string
    );

    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: (error as Error).message,
    });
  }
}