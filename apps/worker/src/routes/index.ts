import { Router, type Router as ExpressRouter } from "express";
import metricsRoutes from "./metrics.route"

const router: ExpressRouter = Router();

router.use("/metrics",metricsRoutes);

export default router;