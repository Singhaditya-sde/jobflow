import { Router , type Router as ExpressRouter } from "express";
import { createJobController } from "../controllers/job.controller";

const router: ExpressRouter = Router();

router.post("/",createJobController);

export default router;