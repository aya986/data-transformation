import { Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { Job } from 'src/entities/job.entity';
import { JobRepository } from 'src/shared/job-fetcher/repositories/job.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from './dto/page.dto';
import { PageMetaDto } from './dto/page-meta.dto';

@Injectable()
export class JobOffersService {

  constructor(
    @InjectRepository(JobRepository) private readonly jobRepository: JobRepository,
  ) { }
  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Job>>  {
    const queryBuilder = this.jobRepository.createQueryBuilder("job");
    
    queryBuilder
      .orderBy("job.datePosted", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} jobOffer`;
  // }

}
