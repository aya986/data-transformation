import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { PageOptionsDto } from "./page-options.dto";

export class JobPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: "Filter by job title" })
  @IsString()
  @IsOptional()
  readonly position?: string;

  @ApiPropertyOptional({ description: "Filter by location" })
  @IsString()
  @IsOptional()
  readonly location?: string;

  @ApiPropertyOptional({ description: "Minimum salary", minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly minSalary?: number;

  @ApiPropertyOptional({ description: "Maximum salary", minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly maxSalary?: number;
}
