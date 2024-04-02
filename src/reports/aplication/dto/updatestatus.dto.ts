/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateStatusUseCase } from '../usecases/updatestatus.usecase';
import { TypeOfStatus } from '@prisma/client';

export class UpdateStatusDto implements Omit<UpdateStatusUseCase.Input, 'id'> {
  @IsString()
  @IsNotEmpty()
  status: TypeOfStatus;
}
