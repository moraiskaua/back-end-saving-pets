/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateLocationUseCase } from '../usecases/updatelocation.usecase';

export class UpdateLocationDto
  implements Omit<UpdateLocationUseCase.Input, 'id'>
{
  @IsString()
  @IsNotEmpty()
  location: string;
}
