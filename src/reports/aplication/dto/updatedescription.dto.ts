/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateDescriptionUseCase } from '../usecases/updatedescription.usecase';

export class UpdateDescriptionDto
  implements Omit<UpdateDescriptionUseCase.Input, 'id'>
{
  @IsString()
  @IsNotEmpty()
  description: string;
}
