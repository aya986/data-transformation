import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Job } from 'src/entities/job.entity';

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
