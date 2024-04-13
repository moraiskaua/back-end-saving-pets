/* eslint-disable indent */
import { ReportOutput } from '@/reports/aplication/dto/report-output';
import { ListReportsUseCase } from '@/reports/aplication/usecases/listreports.usecase';
import { TypeOfAbuse, TypeOfStatus } from '@/reports/entities/report.entity';
import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { Transform } from 'class-transformer';

export class ReportPresenter {
  id: string;
  type: TypeOfAbuse;
  description: string;
  location: string;
  status: TypeOfStatus;
  images: string[];
  userId: string;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: ReportOutput) {
    this.id = output.id;
    this.type = output.type;
    this.description = output.description;
    this.location = output.location;
    this.status = output.status;
    this.images = output.images;
    this.userId = output.userId;
    this.createdAt = output.createdAt;
  }
}

export class ReportCollectionPresenter extends CollectionPresenter {
  data: ReportPresenter[];

  constructor(output: ListReportsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new ReportPresenter(item));
  }
}
