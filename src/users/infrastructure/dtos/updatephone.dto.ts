/* eslint-disable indent */
import { UpdatePhoneUseCase } from '@/users/application/usecases/updatephone.usecase';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePhoneDto implements Omit<UpdatePhoneUseCase.Input, 'id'> {
  @IsString()
  @IsNotEmpty()
  phone: string;
}
