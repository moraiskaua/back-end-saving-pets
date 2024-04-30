import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ShelterRepository } from '@/shelters/domain/repositories/shelter.repository';
import { ShelterEntity } from '@/shelters/entities/shelter.entity';
import { ShelterModelMapper } from '../models/shelter-model.mapper';

export class ShelterPrismaRepository implements ShelterRepository.Repository {
  sortableFields: string[] = ['createdAt'];

  constructor(private prismaService: PrismaService) {}

  async search(
    props: ShelterRepository.SearchParams,
  ): Promise<ShelterRepository.SearchResult> {
    const sortable = this.sortableFields.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';

    const count = await this.prismaService.shelter.count({
      where: {
        ...(props.filter && {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        }),
        ...(props.userId && { userId: props.userId }),
      },
    });

    const models = await this.prismaService.shelter.findMany({
      where: {
        ...(props.filter && {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        }),
        ...(props.userId && { userId: props.userId }),
      },
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });

    return new ShelterRepository.SearchResult({
      items: models.map(model => ShelterModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: ShelterEntity): Promise<void> {
    await this.prismaService.shelter.create({
      data: entity.toJSON(),
    });
  }

  async update(entity: ShelterEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.shelter.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.shelter.delete({
      where: {
        id,
      },
    });
  }

  findById(id: string): Promise<ShelterEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ShelterEntity[]> {
    const models = await this.prismaService.shelter.findMany();
    return models.map(model => ShelterModelMapper.toEntity(model));
  }

  protected async _get(id: string): Promise<ShelterEntity> {
    try {
      const report = await this.prismaService.shelter.findUnique({
        where: { id },
      });

      return ShelterModelMapper.toEntity(report);
    } catch {
      throw new NotFoundError('Report not found');
    }
  }
}
