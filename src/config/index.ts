import { CronExpression } from '@nestjs/schedule';
import * as dotenv from 'dotenv';

dotenv.config();

export const Scheduling = {
  cronTime: process.env.CRONJOB_CRONTIME || CronExpression.EVERY_10_SECONDS,
};
