import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { ShelterValidatorFactory } from '../domain/validators/shelter.validator';
import { UpdateShelterDto } from '../aplication/dto/updateshelter.dto';

export type ShelterProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  openingHours: string;
  images: string[];
  createdAt: Date;
};

export class ShelterEntity extends Entity<ShelterProps> {
  constructor(
    public readonly props: ShelterProps,
    id?: string,
  ) {
    ShelterEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(updateShelterDto: UpdateShelterDto): void {
    const newProps: ShelterProps = {
      ...this.props,
      ...updateShelterDto,
    };

    ShelterEntity.validate(newProps);
    Object.assign(this.props, updateShelterDto);
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get phone(): string {
    return this.props.phone;
  }

  private set phone(value: string) {
    this.props.phone = value;
  }

  get images(): string[] {
    return this.props.images;
  }

  private set images(value: string[]) {
    this.props.images = value;
  }

  get address(): string {
    return this.props.address;
  }

  private set address(value: string) {
    this.props.address = value;
  }

  get website(): string {
    return this.props.website;
  }

  private set website(value: string) {
    this.props.website = value;
  }

  get openingHours(): string {
    return this.props.openingHours;
  }

  private set openingHours(value: string) {
    this.props.openingHours = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: ShelterProps) {
    const validator = ShelterValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
