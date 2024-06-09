import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';

export namespace DeleteShelterUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private shelterRepository: ShelterRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.shelterRepository.delete(input.id);
    }
  }
}
