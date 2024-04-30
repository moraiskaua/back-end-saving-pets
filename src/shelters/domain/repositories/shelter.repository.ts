import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { ShelterEntity } from '@/shelters/entities/shelter.entity';

export namespace ShelterRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    ShelterEntity,
    Filter
  > {}

  export interface Repository
    extends SearchableRepositoryInterface<
      ShelterEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
