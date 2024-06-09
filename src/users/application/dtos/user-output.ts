import { UserEntity } from '@/users/domain/entities/user.entity';

export type UserOutput = {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity.toJSON();
  }
}
