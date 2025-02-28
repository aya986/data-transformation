import { Module } from '@nestjs/common';
import { JobFetcherService } from './job-fetcher.service';
import { JobFetcherController } from './job-fetcher.controller';

@Module({
  controllers: [JobFetcherController],
  providers: [JobFetcherService],
})
export class JobFetcherModule {}
