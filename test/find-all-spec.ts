import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Job } from "src/entities/job.entity";
import { JobOffersService } from "src/api/job-offers/job-offers.service";
import { JobOffersController } from "src/api/job-offers/job-offers.controller";
import { JobPageOptionsDto } from "src/api/job-offers/dto/job-page-options.dto";

describe("JobOffersController (e2e)", () => {
  let app: INestApplication;
  let jobOffersService: JobOffersService;
  let jobRepository: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobOffersController],
      providers: [
        JobOffersService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    jobOffersService = module.get<JobOffersService>(JobOffersService);
    jobRepository = module.get<Repository<Job>>(getRepositoryToken(Job));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return a list of job offers", async () => {
    const jobPageOptionsDto: JobPageOptionsDto = {
      page: 1,
      take: 10,
      skip: 0,
    };

    const mockJobs: Job[] = [
      {
        id: 54,
        jobId: "P1-75",
        position: "Data Scientist",
        isRemote: true,
        type: "Contract",
        location: "Seattle, WA",
        min: 62000,
        max: 142000,
        currency: "USD",
        provider: "provider1",
        datePosted: new Date("2025-02-21T20:01:59.384Z"),
      },
      {
        id: 53,
        jobId: "job-229",
        position: "Data Scientist",
        isRemote: false,
        location: "CA - Austin",
        min: 74000,
        max: 86000,
        currency: "USD",
        provider: "provider2",
        datePosted: new Date("2025-02-21T00:00:00.000Z"),
      },
    ];

    jest.spyOn(jobOffersService, "findAll").mockResolvedValue({
      data: mockJobs,
      meta: {
        itemCount: 2,
        pageCount: 1,
        page: 1,
        take: 10,
        hasPreviousPage: false,
        hasNextPage: true,
      },
    });

    return request(app.getHttpServer())
      .get("/job-offers")
      .query(jobPageOptionsDto)
      .expect(200)
      .expect({
        data: mockJobs,
        meta: { itemCount: 2, pageCount: 1, page: 1 },
      });
  });
  it("should return a bad request error for invalid query parameters", async () => {
    const invalidPageOptionsDto = {
      page: -1, // Invalid page number
      take: 10,
    };

    return request(app.getHttpServer())
      .get("/job-offers")
      .query(invalidPageOptionsDto)
      .expect(400);
  });

  it("should return an empty list if no jobs match the query", async () => {
    const jobPageOptionsDto: JobPageOptionsDto = {
      page: 1,
      skip: 0,
      take: 10,
      position: "Non-existing position",
    };

    jest.spyOn(jobOffersService, "findAll").mockResolvedValue({
      data: [],
      meta: {
        itemCount: 0,
        pageCount: 0,
        page: 1,
        take: 0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
    });

    return request(app.getHttpServer())
      .get("/job-offers")
      .query(jobPageOptionsDto)
      .expect(200)
      .expect({
        data: [],
        meta: { itemCount: 0, pageCount: 0, page: 1 },
      });
  });
});
