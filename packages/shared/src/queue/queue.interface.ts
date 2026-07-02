export interface QueueStats {
    queued: number;
    processing: number;
    completed: number;
    failed: number;
}