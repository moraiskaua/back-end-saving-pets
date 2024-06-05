import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword?: string;
    token?: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);

      if (!input.password) {
        throw new InvalidPasswordError('New password is required');
      }

      if (input.oldPassword) {
        const oldPasswordIsValid = await this.hashProvider.compareHash(
          input.oldPassword,
          entity.password,
        );

        if (!oldPasswordIsValid) {
          throw new InvalidPasswordError('Old password is invalid');
        }
      } else if (input.token) {
        if (
          input.token !== entity.resetPasswordToken ||
          new Date() > entity.resetPasswordExpires
        ) {
          throw new InvalidPasswordError('Token is invalid or expired');
        }

        await this.userRepository.clearResetPasswordToken(entity.id);
      } else {
        throw new InvalidPasswordError('Old password or token is required');
      }

      const hashedPassword = await this.hashProvider.generateHash(
        input.password,
      );
      entity.updatePassword(hashedPassword);
      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
