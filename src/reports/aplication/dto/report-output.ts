import {
  ReportEntity,
  TypeOfAbuse,
  TypeOfStatus,
} from '@/reports/entities/report.entity';

export type ReportOutput = {
  id: string;
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  createdAt: Date;
  userId: string;
};

export class ReportOutputMapper {
  static toOutput(entity: ReportEntity): ReportOutput {
    return entity.toJSON();
  }
}
