import { Request, Response } from "express";
import { CreateJob } from "../services/job.service";

export async function createJobController(
  req: Request,
  res: Response
) {
  try{
    const { type , priority , payload } = req.body;

    if(!type || !payload) {
      return res.json({
        success: false,
        meassage: "type and payload are required",
      });
    }

    const job = await CreateJob({
      type,
      priority: priority ?? 1,
      payload,
    });

    return res.status(201).json({
      success: true,
      message: job.id,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}