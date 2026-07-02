import { Router, type Router as ExpressRouter } from "express";
import { healthController } from "../controllers/health.controller";

const router: ExpressRouter = Router();

router.get("/", healthController);

export default router;