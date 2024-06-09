/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordWithTokenDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
