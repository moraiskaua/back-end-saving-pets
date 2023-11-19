import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../errors/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { HashProvider } from '@/shared/application/providers/hash-provider';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
    cpf: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    createdAt: Date;
  };

  export class UseCase {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { name, email, password, cpf } = input;

      if (!name || !email || !password || !cpf) {
        throw new BadRequestError('Missing params');
      }

      await this.userRepository.emailExists(email);
      const hashedPassword = await this.hashProvider.generateHash(password);
      const entity = new UserEntity(
        Object.assign(input, { password: hashedPassword }),
      );

      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}