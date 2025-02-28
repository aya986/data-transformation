import { Test, TestingModule } from '@nestjs/testing';
import { JobFetcherService } from './job-fetcher.service';

describe('JobFetcherService', () => {
  let service: JobFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFetcherService],
    }).compile();

    service = module.get<JobFetcherService>(JobFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
