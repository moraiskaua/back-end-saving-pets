/* eslint-disable indent */
import { ReportProps, TypeOfAbuse } from '@/reports/entities/report.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReportRules {
  @IsEnum(TypeOfAbuse)
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

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({ type, description, location, images, createdAt }) {
    {
      Object.assign(this, { type, description, location, images, createdAt });
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
