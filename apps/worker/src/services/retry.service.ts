export class RetryService {
  getDelay(attempts: number): number {
    return Math.pow(2, attempts - 1) * 1000;
  }
}