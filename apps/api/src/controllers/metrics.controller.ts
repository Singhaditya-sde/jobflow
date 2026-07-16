import { Request, Response } from "express";
import { register } from "../metrics/registry";

export async function getMetricsController(
  req: Request,
  res: Response
) {
  try {
    res.setHeader(
      "Content-Type",
      register.contentType
    );

    res.end(await register.metrics());
  } catch (error) {
    console.error(error);

    res.status(500).end();
  }
}