export class Provider1MetadataDto {
  requestId: string;
  timestamp: string;
}

export class Provider1JobDetailsDto {
  location: string;
  type: string;
  salaryRange: string;
}

export class Provider1CompanyDto {
  name: string;
  industry: string;
}

export class Provider1JobDto {
  jobId: string;
  title: string;
  details: Provider1JobDetailsDto;
  company: Provider1CompanyDto;
  skills: string[];
  postedDate: string;
}

export class Provider1ResponseDto {
  metadata: Provider1MetadataDto;
  jobs: Provider1JobDto[]
}
