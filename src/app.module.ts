import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobFetcherModule } from './shared/job-fetcher/job-fetcher.module';

@Module({
  imports: [JobFetcherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
