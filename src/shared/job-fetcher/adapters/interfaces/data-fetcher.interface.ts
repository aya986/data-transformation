import { Injectable } from "@nestjs/common";
import { unifiedResponseDto } from "../../dto/unified-response.dto";
import { Provider1Adapter } from "../adapters/provide1.adapter";
import { Provider2Adapter } from "../adapters/provide2.adapter";
import { Provides } from "../../enums";
import { Provider2ResponseDto } from "../../dto/provider2-response.dto";
import { Provider1ResponseDto } from "../../dto/provider1-response.dto";

export type ProvidersDto = Provider1ResponseDto | Provider2ResponseDto;
@Injectable()
export class ProviderFactory {
  constructor(
    private readonly provider1AdapterService: Provider1Adapter,
    private readonly provider2AdapterService: Provider2Adapter,
  ) {}

  createProvider(type: Provides): DataFetcher<ProvidersDto> {
    switch (type) {
      case "provider1":
        return this.provider1AdapterService;
      case "provider2":
        return this.provider2AdapterService;
      default:
        throw new Error('Invalid provider type');
    }
  }
}

export interface DataFetcher<T> {
  fetchJobs(): Promise<unifiedResponseDto>;
  unified(input:T): unifiedResponseDto;
}