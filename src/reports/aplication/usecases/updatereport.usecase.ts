import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';
import { TypeOfAbuse } from '@prisma/client';

export namespace UpdateReportUseCase {
  export type Input = {
    id: string;
    type: TypeOfAbuse;
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.type) {
        throw new BadRequestError('Type is required');
      }

      const entity = await this.reportRepository.findById(input.id);
      entity.update(input.type);
      await this.reportRepository.update(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
