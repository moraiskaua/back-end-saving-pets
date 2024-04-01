import { Entity } from '@/shared/domain/entities/entity';
import { ReportValidatorFactory } from '../domain/validators/report.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type ReportProps = {
  type: TypeOfAbuse;
  description: string;
  location: string;
  images: string[];
  createdAt: Date;
};

export enum TypeOfAbuse {
  ABANDONO,
  AGRESSAO,
  NEGLIGENCIA,
  EXPLORACAO,
  OUTROS,
}

export class ReportEntity extends Entity<ReportProps> {
  constructor(
    public readonly props: ReportProps,
    id?: string,
  ) {
    ReportEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: TypeOfAbuse): void {
    ReportEntity.validate({ ...this.props, type: value });
    this.type = value;
  }

  updateDescription(value: string): void {
    ReportEntity.validate({ ...this.props, description: value });
    this.props.description = value;
  }

  updateLocation(value: string): void {
    ReportEntity.validate({ ...this.props, location: value });
    this.props.location = value;
  }

  updateImages(value: string[]): void {
    ReportEntity.validate({ ...this.props, images: value });
    this.props.images = value;
  }

  get type(): TypeOfAbuse {
    return this.props.type;
  }

  private set type(value: TypeOfAbuse) {
    this.props.type = value;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value;
  }

  get location(): string {
    return this.props.location;
  }

  private set location(value: string) {
    this.props.location = value;
  }

  get images(): string[] {
    return this.props.images;
  }

  private set images(value: string[]) {
    this.props.images = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: ReportProps) {
    const validator = ReportValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
