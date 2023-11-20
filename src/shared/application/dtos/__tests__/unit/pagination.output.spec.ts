import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts';
import { PaginationOutputMapper } from '../../pagination-output';

describe('PaginationOutput unit tests', () => {
  it('Should convert SearchResult to output', () => {
    const result = new SearchResult({
      items: ['fake-item'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '' as any,
      filter: 'fake',
    });
    const sut = PaginationOutputMapper.toOutput(result.items, result);

    expect(sut).toStrictEqual({
      items: ['fake-item'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    });
  });
});
