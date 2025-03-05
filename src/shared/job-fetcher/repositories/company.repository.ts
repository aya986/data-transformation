import { Company } from '@entities/Company.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private readonly dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

}
