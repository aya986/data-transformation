import { Test, TestingModule } from '@nestjs/testing';
import { JobFetcherController } from './job-fetcher.controller';
import { JobFetcherService } from './job-fetcher.service';

describe('JobFetcherController', () => {
  let controller: JobFetcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobFetcherController],
      providers: [JobFetcherService],
    }).compile();

    controller = module.get<JobFetcherController>(JobFetcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
