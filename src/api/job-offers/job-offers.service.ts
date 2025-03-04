import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Job } from "src/entities/job.entity";
import { JobRepository } from "src/shared/job-fetcher/repositories/job.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { PageDto } from "./dto/page.dto";
import { PageMetaDto } from "./dto/page-meta.dto";
import { JobPageOptionsDto } from "./dto/job-page-options.dto";
import {
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  SelectQueryBuilder,
} from "typeorm";

@Injectable()
export class JobOffersService {
  constructor(
    @InjectRepository(JobRepository)
    private readonly jobRepository: JobRepository
  ) {}
  async findAll(jobPageOptionsDto: JobPageOptionsDto): Promise<PageDto<Job>> {
    try {
      const where: FindOptionsWhere<Job> = {};
      const queryBuilder = this.jobRepository.createQueryBuilder("job");

      if (jobPageOptionsDto.position) {
        where.position = ILike("%" + jobPageOptionsDto.position + "%");
      }

      if (jobPageOptionsDto.location) {
        where.location = ILike("%" + jobPageOptionsDto.location + "%");
      }

      if (jobPageOptionsDto.minSalary) {
        where.min = MoreThanOrEqual(jobPageOptionsDto.minSalary);
      }

      if (jobPageOptionsDto.maxSalary) {
        where.max = LessThanOrEqual(jobPageOptionsDto.maxSalary);
      }

      queryBuilder
        .where(where)
        .orderBy("job.datePosted", jobPageOptionsDto.order)
        .skip(jobPageOptionsDto.skip)
        .take(jobPageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto: jobPageOptionsDto,
      });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException("An unexpected error occurred.");
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} jobOffer`;
  // }
}
