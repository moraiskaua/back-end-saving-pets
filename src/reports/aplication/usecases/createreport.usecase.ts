import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';
import { ReportEntity, TypeOfAbuse } from '@/reports/entities/report.entity';

export namespace CreateReportUseCase {
  export type Input = {
    type: TypeOfAbuse;
    description: string;
    location: string;
    images: string[];
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { type, description, location, images } = input;

      if (!type || !description || !location || !images) {
        throw new BadRequestError('Missing params');
      }

      const entity = new ReportEntity(Object.assign(input));

      await this.reportRepository.insert(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
