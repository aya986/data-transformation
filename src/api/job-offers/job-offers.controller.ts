import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { PageOptionsDto } from './dto/page-options.dto';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.jobOffersService.findAll(pageOptionsDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobOffersService.findOne(+id);
  // }
}
