import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { SearchInput } from '@/shared/application/dtos/search-input';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace ListReportsUseCase {
  export type Input = SearchInput;
  export type Output = PaginationOutput<ReportOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new ReportRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

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
