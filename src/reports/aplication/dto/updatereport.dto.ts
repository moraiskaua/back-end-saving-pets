/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateReportUseCase } from '../usecases/updatereport.usecase';
import { TypeOfAbuse } from '@prisma/client';

export class UpdateReportDto implements Omit<UpdateReportUseCase.Input, 'id'> {
  @IsString()
  @IsNotEmpty()
  type: TypeOfAbuse;
}
