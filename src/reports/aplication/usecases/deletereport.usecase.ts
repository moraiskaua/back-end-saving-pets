import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace DeleteReportUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.reportRepository.delete(input.id);
    }
  }
}
