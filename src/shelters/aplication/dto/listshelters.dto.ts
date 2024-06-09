/* eslint-disable indent */
import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsOptional } from 'class-validator';
import { ListSheltersUseCase } from '../usecases/listshelters.usecase';

export class ListSheltersDto implements ListSheltersUseCase.Input {
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
