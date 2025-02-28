import { unifiedResponseDto } from "../../dto/unified-response.dto";

export interface DataFetcher<T> {
  fetchJobs(): Promise<unifiedResponseDto>;
  unified(input:T): unifiedResponseDto;
  // refundPayment(transactionId: string, amount: number): Promise<boolean>;
}