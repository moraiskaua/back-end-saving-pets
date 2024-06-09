import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace GetReportUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.reportRepository.findById(input.id);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
