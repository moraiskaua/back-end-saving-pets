import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { PrivateUseCase } from '@/shared/application/usecases/private.use-case';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';
import {
  ReportEntity,
  TypeOfAbuse,
  TypeOfStatus,
} from '@/reports/entities/report.entity';

export namespace CreateReportUseCase {
  export type Input = {
    type: TypeOfAbuse;
    description: string;
    status: TypeOfStatus;
    location: string;
    images: string[];
  };

  export type Output = ReportOutput;

  export class UseCase implements PrivateUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(userId: string, input: Input): Promise<Output> {
      const { type, description, location, images, status } = input;

      if (!type || !description || !location || !images || !status) {
        throw new BadRequestError('Missing params');
      }

      const entity = new ReportEntity(Object.assign({ ...input, userId }));

      await this.reportRepository.insert(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
