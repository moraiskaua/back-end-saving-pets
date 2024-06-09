/* eslint-disable indent */
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { UserOutput } from '@/users/application/dtos/user-output';
import { ListUsersUseCase } from '@/users/application/usecases/listusers.usecase';
import { Transform } from 'class-transformer';

export class UserPresenter {
  id: string;
  image: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  resetPasswordToken: string;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  resetPasswordExpires: Date;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.image = output.image;
    this.name = output.name;
    this.email = output.email;
    this.cpf = output.cpf;
    this.phone = output.phone;
    this.resetPasswordToken = output.resetPasswordToken;
    this.resetPasswordExpires = output.resetPasswordExpires;
    this.createdAt = output.createdAt;
  }
}

export class UserCollectionPresenter extends CollectionPresenter {
  data: UserPresenter[];

  constructor(output: ListUsersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new UserPresenter(item));
  }
}
