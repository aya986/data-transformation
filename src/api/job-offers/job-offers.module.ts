import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from '@src/shared/job-fetcher/repositories/job.repository';
import { Job } from '@entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job])
  ],
  exports: [JobOffersService],
  controllers: [JobOffersController],
  providers: [JobOffersService, JobRepository],
})
export class JobOffersModule {}
