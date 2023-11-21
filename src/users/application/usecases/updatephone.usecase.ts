import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdatePhoneUseCase {
  export type Input = {
    id: string;
    phone: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.phone) {
        throw new BadRequestError('Phone is required');
      }

      const entity = await this.userRepository.findById(input.id);
      entity.updatePhone(input.phone);
      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
