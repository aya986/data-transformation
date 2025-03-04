import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { JobPageOptionsDto } from './dto/job-page-options.dto';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  findAll(@Query() jobPageOptionsDto: JobPageOptionsDto) {
    return this.jobOffersService.findAll(jobPageOptionsDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobOffersService.findOne(+id);
  // }
}
