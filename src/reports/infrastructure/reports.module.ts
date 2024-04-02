import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { CreateReportUseCase } from '../aplication/usecases/createreport.usecase';
import { ReportRepository } from '../domain/repositories/report.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ReportPrismaRepository } from './database/prisma/repositories/report-prisma.repository';
import { GetReportUseCase } from '../aplication/usecases/getreport.usecase';
import { ListReportsUseCase } from '../aplication/usecases/listreports.usecase';

@Module({
  imports: [AuthModule],
  controllers: [ReportsController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ReportRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ReportPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateReportUseCase.UseCase,
      useFactory: (reportRepository: ReportRepository.Repository) => {
        return new CreateReportUseCase.UseCase(reportRepository);
      },
      inject: ['ReportRepository'],
    },
    {
      provide: CreateReportUseCase.UseCase,
      useFactory: (reportRepository: ReportRepository.Repository) => {
        return new CreateReportUseCase.UseCase(reportRepository);
      },
      inject: ['ReportRepository'],
    },
    {
      provide: GetReportUseCase.UseCase,
      useFactory: (reportRepository: ReportRepository.Repository) => {
        return new GetReportUseCase.UseCase(reportRepository);
      },
      inject: ['ReportRepository'],
    },
    {
      provide: ListReportsUseCase.UseCase,
      useFactory: (reportRepository: ReportRepository.Repository) => {
        return new ListReportsUseCase.UseCase(reportRepository);
      },
      inject: ['ReportRepository'],
    },
  ],
})
export class ReportsModule {}
