import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Company } from "./Company.entity";
import { Skill } from "./skill.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  jobId: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  isRemote?: boolean;

  @Column({ nullable: true })
  type?: string;

  @Column()
  location: string;

  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  currency: string;

  @Column()
  provider: string;

  @ManyToOne(() => Company, (company) => company.jobs, { cascade: true })
  company: Company;

  @Column({ nullable: true })
  experienceLevel?: string;

  @Column({ nullable: true })
  education?: string;

  @ManyToMany(() => Skill, { cascade: true })
  @JoinTable()
  skills: Skill[];

  @Column()
  datePosted: string;
}
