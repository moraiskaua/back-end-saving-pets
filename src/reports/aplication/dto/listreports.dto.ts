/* eslint-disable indent */
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { ListReportsUseCase } from '../usecases/listreports.usecase';

export class ListReportsDto implements ListReportsUseCase.Input {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;

  @IsOptional()
  sort?: string;

  @IsOptional()
  sortDir?: SortDirection;

  @IsOptional()
  filter?: string;
}
