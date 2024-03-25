/* eslint-disable indent */
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @MaxLength(18)
  @IsString()
  phone: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    name,
    image,
    email,
    password,
    cpf,
    phone,
    createdAt,
  }: UserProps) {
    Object.assign(this, {
      name,
      image,
      email,
      password,
      cpf,
      phone,
      createdAt,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
