export interface Job {
  id: string;
  type: string;
  status: string;
  priority: number;
  attempts: number;
  createdAt: string;
}