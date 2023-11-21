import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.phone = this.props.phone ?? '';
  }

  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value });
    this.password = value;
  }

  updatePhone(value: string): void {
    UserEntity.validate({ ...this.props, phone: value });
    this.props.phone = value;
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

  get password(): string {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get phone(): string {
    return this.props.phone;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
