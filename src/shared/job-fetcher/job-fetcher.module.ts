import { Module } from '@nestjs/common';
import { JobFetcherService } from './job-fetcher.service';
import { JobFetcherController } from './job-fetcher.controller';
import { ProviderFactory } from './adapters/interfaces/data-fetcher.interface';
import { Provider1Adapter } from './adapters/adapters/provide1.adapter';
import { Provider2Adapter } from './adapters/adapters/provide2.adapter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [JobFetcherController],
  providers: [JobFetcherService, ProviderFactory, Provider1Adapter, Provider2Adapter],
})
export class JobFetcherModule {}
