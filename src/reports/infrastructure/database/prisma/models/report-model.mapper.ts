import { ReportEntity } from '@/reports/entities/report.entity';
import { ValidationError } from '@/shared/domain/errors/validation-error';
import { Report as ReportPrisma } from '@prisma/client';

export class ReportModelMapper {
  static toEntity(model: ReportPrisma) {
    const data = {
      id: model.id,
      type: model.type,
      description: model.description,
      location: model.location,
      images: model.images,
      userId: model.userId,
      createdAt: model.createdAt,
    };

    try {
      return new ReportEntity(data, model.id);
    } catch {
      throw new ValidationError(
        'An error occurred while trying to convert the model to entity',
      );
    }
  }
}
