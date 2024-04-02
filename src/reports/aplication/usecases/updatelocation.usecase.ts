import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';

export namespace UpdateLocationUseCase {
  export type Input = {
    id: string;
    location: string;
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.location) {
        throw new BadRequestError('Location is required');
      }

      const entity = await this.reportRepository.findById(input.id);
      entity.updateLocation(input.location);
      await this.reportRepository.update(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
