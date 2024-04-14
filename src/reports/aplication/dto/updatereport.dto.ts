/* eslint-disable indent */
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateReportUseCase } from '../usecases/updatereport.usecase';
import { TypeOfAbuse } from '@prisma/client';
import { TypeOfStatus } from '@/reports/entities/report.entity';

export class UpdateReportDto implements Omit<UpdateReportUseCase.Input, 'id'> {
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
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];
}
