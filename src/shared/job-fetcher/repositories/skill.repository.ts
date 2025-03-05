import { Skill } from '@entities/skill.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SkillRepository extends Repository<Skill> {
  constructor(private readonly dataSource: DataSource) {
    super(Skill, dataSource.createEntityManager());
  }

}
