import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobFetcherModule } from './shared/job-fetcher/job-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { JobOffersModule } from './api/job-offers/job-offers.module';

@Module({
  imports: [
    JobFetcherModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    JobOffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
