import { Router, type Router as ExpressRouter } from "express";

import healthRoutes from "./health.route";
import jobRoutes from "./job.route";
import metricsRoutes from "./metrics.route";
import dashboardRoutes from "./dashboard.routes"

const router: ExpressRouter = Router();

router.use("/health", healthRoutes);
router.use("/jobs", jobRoutes);
router.use("/metrics", metricsRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;