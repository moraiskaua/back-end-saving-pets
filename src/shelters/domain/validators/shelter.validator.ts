/* eslint-disable indent */
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import { ShelterProps } from '@/shelters/entities/shelter.entity';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ShelterRules {
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

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    name,
    email,
    phone,
    address,
    website,
    openingHours,
    images,
    createdAt,
  }: ShelterProps) {
    {
      Object.assign(this, {
        name,
        email,
        phone,
        address,
        website,
        openingHours,
        images,
        createdAt,
      });
    }
  }
}

export class ShelterValidator extends ClassValidatorFields<ShelterRules> {
  validate(data: ShelterProps): boolean {
    return super.validate(new ShelterRules(data ?? ({} as ShelterProps)));
  }
}

export class ShelterValidatorFactory {
  static create(): ShelterValidator {
    return new ShelterValidator();
  }
}
