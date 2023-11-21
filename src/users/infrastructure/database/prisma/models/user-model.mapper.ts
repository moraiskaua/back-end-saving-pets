import { ValidationError } from '@/shared/domain/errors/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { User } from '@prisma/client';

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      cpf: model.cpf,
      phone: model.phone,
      createdAt: model.createdAt,
    };

    try {
      return new UserEntity(data, model.id);
    } catch {
      throw new ValidationError(
        'An error occurred while trying to convert the model to entity',
      );
    }
  }
}
