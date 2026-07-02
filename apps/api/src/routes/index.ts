import { Router, type Router as ExpressRouter } from "express";
import healthRoutes from "./health.route";
import jobRoutes from "./job.route";

const router: ExpressRouter = Router();

router.use("/health",healthRoutes);
router.use("/jobs",jobRoutes);

export default router;