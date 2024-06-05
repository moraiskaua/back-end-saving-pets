/* eslint-disable indent */
import { UpdatePasswordUseCase } from '@/users/application/usecases/updatepassword.usecase';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  oldPassword?: string;

  @IsString()
  @IsOptional()
  token?: string;
}
