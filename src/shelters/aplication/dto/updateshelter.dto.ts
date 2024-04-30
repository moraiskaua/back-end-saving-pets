/* eslint-disable indent */

import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateShelterUseCase } from '../usecases/updateshelter.usecase';

export class UpdateShelterDto
  implements Omit<UpdateShelterUseCase.Input, 'id'>
{
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
