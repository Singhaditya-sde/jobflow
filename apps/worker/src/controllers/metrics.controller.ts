import { Request, Response } from "express";
import { register } from "../metrics/registry";

export async function getMetricsController(
  req: Request,
  res: Response
) {
  res.setHeader(
    "Content-Type",
    register.contentType
  );

  res.end(await register.metrics());
}