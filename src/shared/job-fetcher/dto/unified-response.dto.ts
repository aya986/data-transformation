export class CompensationDto {
  min: number;
  max: number;
  currency: string;
}

export class CompanyDto {
  companyName: string;
  website?: string;
  industry?: string;
}

export class RequirementsDto {
  experience: number;
  skils: string[];
}

export class unifiedJobDto {
  jobId: string;
  position: string;
  isRemote?: boolean;
  type?: string;
  location: string;
  compensation: CompensationDto;
  company: CompanyDto;
  requirements: RequirementsDto;
  datePosted: Date;
}

export class unifiedResponseDto {
  status: string;
  jobsList:unifiedJobDto[];
}
