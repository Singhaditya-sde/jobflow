import { Router,type Router as ExpressRouter } from "express";
import { getMetricsController } from "../controllers/metrics.controller";

const router: ExpressRouter  = Router();

router.get("/", getMetricsController);

export default router;