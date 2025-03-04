import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
import { DataSource } from 'typeorm';
import { Skill } from '../entities/skill.entity';

dotenv.config();

export function validateDatabaseEnvironment() {
  if (
    !(
      process.env.POSTGRES_USER &&
      process.env.POSTGRES_PASSWORD &&
      process.env.POSTGRES_DATABASE
    )
  ) {
    console.log(
      chalk.bgRed.white.bold(
        'Postgres Username, Password or DB Name not provided!\nExiting...',
      ),
    );
    process.exit(1);
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [
      Skill
    ],
    migrations: [],
    autoLoadEntities: true,
    synchronize: false,
  })};

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
