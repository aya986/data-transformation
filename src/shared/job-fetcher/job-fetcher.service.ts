import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProviderFactory } from './adapters/interfaces/data-fetcher.interface';
import { Provides } from './enums';

@Injectable()
export class JobFetcherService {
  constructor(
    private providerFactory: ProviderFactory,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    for (const provider of Object.values(Provides)) {
      console.log(provider);
      const dataFetcher = this.providerFactory.createProvider(provider);
      const result = await dataFetcher.fetchJobs();
      console.log(`result length`, result.jobsList.length);
      
    }
    console.log("Running scheduled job to fetch jobs...");
  }
}
