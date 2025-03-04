import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true })
  website?: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job;
}
