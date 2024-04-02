import { ReportRepository } from '@/reports/domain/repositories/report.repository';
import { ReportEntity } from '@/reports/entities/report.entity';
import { ReportModelMapper } from '@/reports/infrastructure/database/prisma/models/report-model.mapper';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';

export class ReportPrismaRepository implements ReportRepository.Repository {
  constructor(private prismaService: PrismaService) {}
  sortableFields: string[];

  async search(
    props: ReportRepository.SearchParams,
  ): Promise<ReportRepository.SearchResult> {
    const sortable = false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';

    const count = await this.prismaService.report.count({
      ...(props.filter && {
        where: {
          description: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    const models = await this.prismaService.report.findMany({
      ...(props.filter && {
        where: {
          description: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [orderByField]: orderByDir,
        },
        skip:
          props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
        take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      }),
    });

    return new ReportRepository.SearchResult({
      items: models.map(model => ReportModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }

  async insert(entity: ReportEntity): Promise<void> {
    await this.prismaService.report.create({
      data: entity.toJSON(),
    });
  }

  async update(entity: ReportEntity): Promise<void> {
    await this._get(entity._id);
    await this.prismaService.report.update({
      data: entity.toJSON(),
      where: {
        id: entity._id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.report.delete({
      where: {
        id,
      },
    });
  }

  findById(id: string): Promise<ReportEntity> {
    return this._get(id);
  }

  async findAll(): Promise<ReportEntity[]> {
    const models = await this.prismaService.report.findMany();
    return models.map(model => ReportModelMapper.toEntity(model));
  }

  protected async _get(id: string): Promise<ReportEntity> {
    try {
      const report = await this.prismaService.report.findUnique({
        where: { id },
      });

      return ReportModelMapper.toEntity(report);
    } catch {
      throw new NotFoundError('Report not found');
    }
  }
}
