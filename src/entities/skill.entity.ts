import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
  })
  title: string;
}
