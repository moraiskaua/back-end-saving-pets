/* eslint-disable indent */
import { UpdateImageUseCase } from '@/users/application/usecases/updateimage.usecase';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageDto implements Omit<UpdateImageUseCase.Input, 'id'> {
  @IsString()
  @IsNotEmpty()
  image: string;
}
