import { ValidationError } from '@/shared/domain/errors/validation-error';
import { ShelterEntity } from '@/shelters/entities/shelter.entity';
import { Shelter as ShelterPrisma } from '@prisma/client';

export class ShelterModelMapper {
  static toEntity(model: ShelterPrisma) {
    const data = {
      id: model.id,
      name: model.name,
      email: model.email,
      phone: model.phone,
      website: model.website,
      address: model.address,
      openingHours: model.openingHours,
      images: model.images,
      createdAt: model.createdAt,
    };

    try {
      return new ShelterEntity(data, model.id);
    } catch {
      throw new ValidationError(
        'An error occurred while trying to convert the model to entity',
      );
    }
  }
}
