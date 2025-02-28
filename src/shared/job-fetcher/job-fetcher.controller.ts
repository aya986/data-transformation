import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobFetcherService } from './job-fetcher.service';
// import { CreateJobFetcherDto } from './dto/provider1-response.dto';
// import { UpdateJobFetcherDto } from './dto/update-job-fetcher.dto';

@Controller('job-fetcher')
export class JobFetcherController {
  constructor(private readonly jobFetcherService: JobFetcherService) {}

  // @Post()
  // create(@Body() createJobFetcherDto: CreateJobFetcherDto) {
  //   return this.jobFetcherService.create(createJobFetcherDto);
  // }

  // @Get()
  // findAll() {
  //   return this.jobFetcherService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobFetcherService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJobFetcherDto: UpdateJobFetcherDto) {
  //   return this.jobFetcherService.update(+id, updateJobFetcherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.jobFetcherService.remove(+id);
  // }
}
