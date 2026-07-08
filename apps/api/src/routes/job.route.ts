import { Router , type Router as ExpressRouter } from "express";
import { createJobController , getJobController } from "../controllers/job.controller";

const router: ExpressRouter = Router();

router.post("/",createJobController);
router.get("/:id", getJobController)

export default router;