/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  openingHours: string;

  @IsString()
  @IsNotEmpty()
  images: string[];
}
