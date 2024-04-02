import { ReportEntity } from '@/reports/entities/report.entity';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export namespace ReportRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<ReportEntity, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      ReportEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
