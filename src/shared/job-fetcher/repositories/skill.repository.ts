import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Skill } from 'src/entities/skill.entity';

@Injectable()
export class SkillRepository extends Repository<Skill> {
  constructor(private readonly dataSource: DataSource) {
    super(Skill, dataSource.createEntityManager());
  }

}
