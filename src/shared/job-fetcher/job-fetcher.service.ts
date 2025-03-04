import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProviderFactory } from "./adapters/interfaces/data-fetcher.interface";
import { Provides } from "./enums";
import { Job } from "src/entities/job.entity";
import { Company } from "src/entities/Company.entity";
import { Skill } from "src/entities/skill.entity";
import { JobRepository } from "./repositories/job.repository";
import { CompanyRepository } from "./repositories/company.repository";
import { SkillRepository } from "./repositories/skill.repository";
import { Scheduling } from "src/config";

@Injectable()
export class JobFetcherService {
  constructor(
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository,
    private skillRepository: SkillRepository,
    private providerFactory: ProviderFactory
  ) {}

  @Cron(Scheduling.cronTime)
  async handleCron() {
    for (const provider of Object.values(Provides)) {
      console.log(provider);
      const dataFetcher = this.providerFactory.createProvider(provider);
      const results = await dataFetcher.fetchJobs();

      if (results.status !== "success") {
        continue;
      }
      const jobs = results.jobsList.map(async (job) => {
        const jobDto = new Job();
        jobDto.position = job.position;
        jobDto.jobId = job.jobId;
        jobDto.isRemote = job.isRemote;
        jobDto.type = job.type;
        jobDto.min = job.compensation.min;
        jobDto.max = job.compensation.max;
        jobDto.currency = job.compensation.currency;
        jobDto.location = job.location;
        jobDto.datePosted = job.datePosted;

        // Handling Company
        let company = await this.companyRepository.findOne({
          where: { name: job.company.companyName },
        });
        if (!company) {
          company = new Company();
          company.name = job.company.companyName;
          company.industry = job.company.industry;
          company.website = job.company.website;
          await this.companyRepository.save(company);
        }
        jobDto.company = company;

        // Handling Skills
        const skills = await Promise.all(
          job.requirements.skils.map(async (skillTitle) => {
            let skill = await this.skillRepository.findOne({
              where: { title: skillTitle },
            });
            if (!skill) {
              skill = new Skill();
              skill.title = skillTitle;
              await this.skillRepository.save(skill);
            }
            return skill;
          })
        );
        jobDto.skills = skills;

        return jobDto;
      });

      // Saving the jobs with company and skill information
      await this.jobRepository.bulkCreate(await Promise.all(jobs));
      console.log("Successfully fetched jobs");
    }
  }
}
