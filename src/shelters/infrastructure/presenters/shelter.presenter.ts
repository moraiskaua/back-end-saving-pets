/* eslint-disable indent */
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { ShelterOutput } from '@/shelters/aplication/dto/shelter-output';
import { ListSheltersUseCase } from '@/shelters/aplication/usecases/listshelters.usecase';
import { Transform } from 'class-transformer';

export class ShelterPresenter {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  openingHours: string;
  images: string[];

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: ShelterOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.phone = output.phone;
    this.address = output.address;
    this.images = output.images;
    this.website = output.website;
    this.openingHours = output.openingHours;
    this.createdAt = output.createdAt;
  }
}

export class ShelterCollectionPresenter extends CollectionPresenter {
  data: ShelterPresenter[];

  constructor(output: ListSheltersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new ShelterPresenter(item));
  }
}
