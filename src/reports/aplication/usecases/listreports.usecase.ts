import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { SearchInput } from '@/shared/application/dtos/search-input';
import { PrivateUseCase } from '@/shared/application/usecases/private.use-case';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace ListReportsUseCase {
  export type Input = SearchInput;
  export type Output = PaginationOutput<ReportOutput>;

  export class UseCase implements PrivateUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(userId: string, input: Input): Promise<Output> {
      const search = { ...input, userId };
      const params = new ReportRepository.SearchParams(search);
      const searchResult = await this.reportRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: ReportRepository.SearchResult): Output {
      const items = searchResult.items.map(item =>
        ReportOutputMapper.toOutput(item),
      );

      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
