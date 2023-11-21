import { UserEntity } from '@/users/domain/entities/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity.toJSON();
  }
}
