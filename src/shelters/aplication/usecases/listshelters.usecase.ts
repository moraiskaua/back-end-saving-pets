import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { SearchInput } from '@/shared/application/dtos/search-input';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ShelterOutput, ShelterOutputMapper } from '../dto/shelter-output';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';

export namespace ListSheltersUseCase {
  export type Input = SearchInput;
  export type Output = PaginationOutput<ShelterOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private shelterRepository: ShelterRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new ShelterRepository.SearchParams(input);
      const searchResult = await this.shelterRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: ShelterRepository.SearchResult): Output {
      const items = searchResult.items.map(item =>
        ShelterOutputMapper.toOutput(item),
      );

      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
