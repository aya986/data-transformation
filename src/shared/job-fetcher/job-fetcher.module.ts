import { Module } from "@nestjs/common";
import { JobFetcherService } from "./job-fetcher.service";
import { JobFetcherController } from "./job-fetcher.controller";
import { ProviderFactory } from "./adapters/interfaces/data-fetcher.interface";
import { Provider1Adapter } from "./adapters/adapters/provide1.adapter";
import { Provider2Adapter } from "./adapters/adapters/provide2.adapter";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "@entities/skill.entity";
import { Job } from "@entities/job.entity";
import { Company } from "@entities/Company.entity";
import { JobRepository } from "./repositories/job.repository";
import { CompanyRepository } from "./repositories/company.repository";
import { SkillRepository } from "./repositories/skill.repository";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Skill, Job, Company])
  ],
  controllers: [JobFetcherController],
  providers: [
    JobFetcherService,
    ProviderFactory,
    Provider1Adapter,
    Provider2Adapter,
    JobRepository,
    CompanyRepository,
    SkillRepository,
  ],
})
export class JobFetcherModule {}
