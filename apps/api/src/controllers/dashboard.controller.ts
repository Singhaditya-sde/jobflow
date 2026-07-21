import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

const service = new DashboardService();

export async function getDashboardMetrics(
  req: Request,
  res: Response
) {
  try {
    const metrics = await service.getMetrics();

    return res.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard metrics",
    });
  }
}