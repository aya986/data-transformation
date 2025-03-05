import { Job } from '@entities/job.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class JobRepository extends Repository<Job> {
  constructor(private readonly dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }

  async bulkCreate(jobs: Job[]): Promise<boolean> {
    try {
      await this.createQueryBuilder()
        .insert()
        .into(Job)
        .values(jobs)
        .orIgnore()
        .execute();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
