import { ReportEntity, TypeOfAbuse } from '@/reports/entities/report.entity';

export type ReportOutput = {
  id: string;
  type: TypeOfAbuse;
  description: string;
  location: string;
  images: string[];
  createdAt: Date;
};

export class ReportOutputMapper {
  static toOutput(entity: ReportEntity): ReportOutput {
    return entity.toJSON();
  }
}
