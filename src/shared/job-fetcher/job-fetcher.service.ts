import { Injectable } from '@nestjs/common';
// import { CreateJobFetcherDto } from './dto/provider1-response.dto';
// import { UpdateJobFetcherDto } from './dto/update-job-fetcher.dto';

@Injectable()
export class JobFetcherService {
  // create(createJobFetcherDto: CreateJobFetcherDto) {
  //   return 'This action adds a new jobFetcher';
  // }

  findAll() {
    return `This action returns all jobFetcher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobFetcher`;
  }

  // update(id: number, updateJobFetcherDto: UpdateJobFetcherDto) {
  //   return `This action updates a #${id} jobFetcher`;
  // }

  remove(id: number) {
    return `This action removes a #${id} jobFetcher`;
  }
}
