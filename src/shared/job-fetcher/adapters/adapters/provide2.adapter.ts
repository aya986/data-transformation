import axios from "axios";
import { DataFetcher } from "../interfaces/data-fetcher.interface";
import {
  RequirementsDto,
  unifiedJobDto,
  unifiedResponseDto,
} from "../../dto/unified-response.dto";
import {
  Provider2LocationDto,
  Provider2RequirementsDto,
  Provider2ResponseDto,
} from "../../dto/provider2-response.dto";

export class Provider2Adapter implements DataFetcher<Provider2ResponseDto> {
  constructor() {}

  async fetchJobs(): Promise<unifiedResponseDto> {
    const url = `https://assignment.devotel.io/api/provider2/jobs`;
    const rseult = await axios.get(url);
    const jobs: Provider2ResponseDto = rseult.data as Provider2ResponseDto;
    return this.unified(jobs);
  }

  public unified(response: Provider2ResponseDto): unifiedResponseDto {
    let jobsList: unifiedJobDto[] = [];

    for (const key in response.data.jobsList) {
      if (Object.prototype.hasOwnProperty.call(response.data.jobsList, key)) {
        const job = response.data.jobsList[key];
        jobsList.push({
          jobId: key,
          position: job.position,
          isRemote: job.location.remote,
          location: this.convertLocation(job.location),
          compensation: job.compensation,
          company: job.employer,
          requirements: this.convertRequirements(job.requirements),
          datePosted: job.datePosted,
        });
      }
    }

    return {
      status: "success",
      jobsList: jobsList,
    };
  }

  private convertLocation(location: Provider2LocationDto): string {
    return location.state + " - " + location.city;
  }

  private convertRequirements(
    requirements: Provider2RequirementsDto
  ): RequirementsDto {
    return {
      experience: requirements.experience,
      skils: requirements.technologies,
    };
  }
}
