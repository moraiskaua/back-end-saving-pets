import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ShelterOutput, ShelterOutputMapper } from '../dto/shelter-output';
import { ShelterEntity } from '@/shelters/entities/shelter.entity';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';

export namespace CreateShelterUseCase {
  export type Input = {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    openingHours: string;
    images: string[];
  };

  export type Output = ShelterOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private shelterRepository: ShelterRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { name, email, phone, website, address, images, openingHours } =
        input;

      if (
        !name ||
        !email ||
        !phone ||
        !website ||
        !address ||
        !images ||
        !openingHours
      ) {
        throw new BadRequestError('Missing params');
      }

      const entity = new ShelterEntity(Object.assign(input));

      await this.shelterRepository.insert(entity);

      return ShelterOutputMapper.toOutput(entity);
    }
  }
}
