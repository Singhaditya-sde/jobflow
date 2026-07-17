import { JobHistoryRepository } from "@jobflow/shared";

export class JobHistoryService {
  async getHistory(jobId: string) {
    return JobHistoryRepository.findByJobId(jobId);
  }
}