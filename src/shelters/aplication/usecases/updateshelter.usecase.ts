import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ShelterOutput, ShelterOutputMapper } from '../dto/shelter-output';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';

export namespace UpdateShelterUseCase {
  export type Input = {
    id: string;
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

      const entity = await this.shelterRepository.findById(input.id);

      if (!entity) {
        throw new NotFoundError('Shelter not found');
      }

      entity.update({
        name,
        email,
        phone,
        website,
        address,
        images,
        openingHours,
      });

      await this.shelterRepository.update(entity);

      return ShelterOutputMapper.toOutput(entity);
    }
  }
}
