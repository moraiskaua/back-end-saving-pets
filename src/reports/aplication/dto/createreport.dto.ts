/* eslint-disable indent */
import { TypeOfAbuse, TypeOfStatus } from '@/reports/entities/report.entity';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateReportUseCase } from '../usecases/createreport.usecase';

export class CreateReportDto implements CreateReportUseCase.Input {
  @IsString()
  @IsNotEmpty()
  type: TypeOfAbuse;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  status: TypeOfStatus;

  @IsString()
  @IsUUID()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];
}
