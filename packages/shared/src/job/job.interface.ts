import { JobType } from "./job-type.enum";
import { JobStatus } from "./job-status.enum";
import { JobPriority } from "./priority.type";

export interface Job {
    id: string;
    type: JobType;
    payload: Record<string, unknown>;
    priority: JobPriority;
    status: JobStatus;
    attempts: number;
    createdAt: Date;
}