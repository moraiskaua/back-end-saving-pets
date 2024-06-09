import { ShelterEntity } from '@/shelters/entities/shelter.entity';

export type ShelterOutput = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  openingHours: string;
  images: string[];
  createdAt: Date;
};

export class ShelterOutputMapper {
  static toOutput(entity: ShelterEntity): ShelterOutput {
    return entity.toJSON();
  }
}
