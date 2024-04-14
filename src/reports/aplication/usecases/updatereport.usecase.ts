import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { ReportOutput, ReportOutputMapper } from '../dto/report-output';
import { ReportRepository } from '@/reports/domain/repositories/report.repository';
import { TypeOfAbuse, TypeOfStatus } from '@/reports/entities/report.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export namespace UpdateReportUseCase {
  export type Input = {
    id: string;
    type: TypeOfAbuse;
    description: string;
    status: TypeOfStatus;
    location: string;
    images: string[];
  };

  export type Output = ReportOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private reportRepository: ReportRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { type, description, location, images, status } = input;

      if (!type || !description || !location || !images || !status) {
        throw new BadRequestError('Missing params');
      }

      const entity = await this.reportRepository.findById(input.id);

      if (!entity) {
        throw new NotFoundError('Report not found');
      }

      entity.update({
        userId: entity.userId,
        type,
        description,
        location,
        images,
        status,
      });

      await this.reportRepository.update(entity);

      return ReportOutputMapper.toOutput(entity);
    }
  }
}
