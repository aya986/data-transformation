import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from 'src/entities/Company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private readonly dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

}
