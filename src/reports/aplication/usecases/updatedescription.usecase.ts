import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace UpdateDescriptionUseCase {
  export type Input = {
    id: string;
    description: string;
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.description) {
        throw new BadRequestError('Description is required');
      }

      const entity = await this.reportRepository.findById(input.id);
      entity.updateDescription(input.description);
      await this.reportRepository.update(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
