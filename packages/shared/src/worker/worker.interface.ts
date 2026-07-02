export interface WorkerInfo {
    id: string;
    status: "IDLE" | "BUSY";
    activeJobs: number;
}