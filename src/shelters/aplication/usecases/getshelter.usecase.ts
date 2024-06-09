import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ShelterOutput, ShelterOutputMapper } from '../dto/shelter-output';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';

export namespace GetShelterUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ShelterOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private shelterRepository: ShelterRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.shelterRepository.findById(input.id);

      return ShelterOutputMapper.toOutput(entity);
    }
  }
}
