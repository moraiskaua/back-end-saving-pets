import { Entity } from '@/shared/domain/entities/entity';
import { ReportValidatorFactory } from '../domain/validators/report.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { UpdateReportDto } from '../aplication/dto/updatereport.dto';

export type ReportProps = {
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  userId: string;
  createdAt?: Date;
};

export type TypeOfAbuse =
  | 'ABANDONO'
  | 'AGRESSAO'
  | 'NEGLIGENCIA'
  | 'EXPLORACAO'
  | 'OUTROS';

export type TypeOfStatus = 'EM_ABERTO' | 'EM_ANDAMENTO' | 'ATENDIDO';

export class ReportEntity extends Entity<ReportProps> {
  constructor(
    public readonly props: ReportProps,
    id?: string,
  ) {
    ReportEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(updateReportDto: UpdateReportDto): void {
    const newProps: ReportProps = {
      ...this.props,
      ...updateReportDto,
    };

    ReportEntity.validate(newProps);
    Object.assign(this.props, updateReportDto);
  }

  updateDescription(value: string): void {
    ReportEntity.validate({ ...this.props, description: value });
    this.props.description = value;
  }

  updateLocation(value: string): void {
    ReportEntity.validate({ ...this.props, location: value });
    this.props.location = value;
  }

  updateStatus(value: TypeOfStatus): void {
    ReportEntity.validate({ ...this.props, status: value });
    this.props.status = value;
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

  get status(): TypeOfStatus {
    return this.props.status;
  }

  private set status(value: TypeOfStatus) {
    this.props.status = value;
  }

  get userId(): string {
    return this.props.userId;
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
