export class Provider2LocationDto {
  city: string;
  state: string;
  remote: boolean;
}

export class Provider2CompensationDto {
  min: number;
  max: number;
  currency: string;
}

export class Provider2EmployerDto {
  companyName: string;
  website: string;
}

export class Provider2RequirementsDto {
  experience: number;
  technologies: string[];
}

export class Provider2JobDto {
  position: string;
  location: Provider2LocationDto;
  compensation: Provider2CompensationDto;
  employer: Provider2EmployerDto;
  requirements: Provider2RequirementsDto;
  datePosted: string;
}

export class Provider2ResponseDto {
  status: string;
  data: {
    jobsList: {
      [key: string]: Provider2JobDto;
    };
  };
}
