import axios from "axios";
import { Provider1CompanyDto, Provider1ResponseDto } from "../../dto/provider1-response.dto";
import { DataFetcher } from "../interfaces/data-fetcher.interface";
import { CompanyDto, CompensationDto, RequirementsDto, unifiedJobDto, unifiedResponseDto } from "../../dto/unified-response.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Provider1Adapter implements DataFetcher<Provider1ResponseDto> {
  constructor() { }

  async fetchJobs(): Promise<unifiedResponseDto> {
    const url = `https://assignment.devotel.io/api/provider1/jobs`;
    const rseult = await axios.get(url)
    const jobs: Provider1ResponseDto = rseult.data as Provider1ResponseDto;
    return this.unified(jobs);
  }

  public unified(response:Provider1ResponseDto): unifiedResponseDto {
    let jobsList: unifiedJobDto[] = [];

    for (const key in response.jobs) {
      if (Object.prototype.hasOwnProperty.call(response.jobs, key)) {
        const job = response.jobs[key];
        jobsList.push({
          jobId: job.jobId,
          position: job.title,
          type: job.details.type,
          location: job.details.location,
          compensation: this.convertCompensation(job.details.salaryRange),
          company: this.convertCompany(job.company),
          requirements: this.convertRequirements(job.skills),
          datePosted: new Date(job.postedDate),
        });
      }
    }

    return {
      status: "success",
      jobsList: jobsList,
    }
  }

  private convertCompensation(salaryRange: string): CompensationDto {
    const [min, max] = salaryRange.split(" - ").map((s) => parseInt(s.replace(/\D/g, ''), 10));
    return {
      min: min * 1000,
      max: max * 1000,
      currency: "USD",
    };
  }

  private convertCompany(company: Provider1CompanyDto): CompanyDto {
    return {
      companyName: company.name,
      industry: company.industry,
    };
  }
  private convertRequirements(skills: string[]): RequirementsDto {
    return {
      experience: 0,
      skils: skills,
    };
  }

}
    