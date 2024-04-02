/* eslint-disable indent */
import {
  ReportProps,
  TypeOfAbuse,
  TypeOfStatus,
} from '@/reports/entities/report.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ReportRules {
  @IsString()
  type: TypeOfAbuse;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  images: string;

  @IsString()
  @IsNotEmpty()
  status: TypeOfStatus;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({
    type,
    description,
    location,
    images,
    userId,
    status,
    createdAt,
  }: ReportProps) {
    {
      Object.assign(this, {
        type,
        description,
        location,
        images,
        userId,
        status,
        createdAt,
      });
    }
  }
}

export class ReportValidator extends ClassValidatorFields<ReportRules> {
  validate(data: ReportProps): boolean {
    return super.validate(new ReportRules(data ?? ({} as ReportProps)));
  }
}

export class ReportValidatorFactory {
  static create(): ReportValidator {
    return new ReportValidator();
  }
}
