/* eslint-disable indent */
import { TypeOfAbuse } from '@/reports/entities/report.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateReportUseCase } from '../usecases/createreport.usecase';

export class CreateReportDto implements CreateReportUseCase.Input {
  @IsString()
  type: TypeOfAbuse;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  images: string[];
}
