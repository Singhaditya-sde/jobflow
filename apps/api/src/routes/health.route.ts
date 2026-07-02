import { Router, type Router as ExpressRouter } from "express";
import { healthController } from "../controllers/health.controller";

const router: ExpressRouter = Router();

router.get("/health", healthController);

export default router;