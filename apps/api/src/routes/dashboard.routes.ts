import { Router, type Router as ExpressRouter } from "express";
import { getDashboardMetrics } from "../controllers/dashboard.controller";

const router: ExpressRouter = Router();

router.get("/metrics", getDashboardMetrics);

export default router;