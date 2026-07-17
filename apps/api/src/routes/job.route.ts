import { Router, type Router as ExpressRouter } from "express";
import { createJobController, getJobController} from "../controllers/job.controller";
import { getJobHistory } from "../controllers/job-history.controller";
import { getAllJobsController } from "../controllers/job-list.controller";

const router: ExpressRouter = Router();

router.post("/", createJobController);
router.get("/", getAllJobsController);
router.get("/:id", getJobController);
router.get("/:jobId/history", getJobHistory);

export default router;