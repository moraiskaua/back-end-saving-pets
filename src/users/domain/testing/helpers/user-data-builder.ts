import { faker } from '@faker-js/faker';
import { UserProps } from '../../entities/user.entity';

type Props = {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  createdAt?: Date;
};

export const UserDataBuilder = (props: Props): UserProps => {
  return {
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    cpf: props.cpf ?? faker.number.bigInt().toString(),
    phone: props.phone ?? faker.number.bigInt().toString(),
    createdAt: props.createdAt ?? new Date(),
  };
};
