import { Router, type Router as ExpressRouter } from "express";
import healthRoutes from "./health.route";

const router: ExpressRouter = Router();

router.use(healthRoutes);

export default router;