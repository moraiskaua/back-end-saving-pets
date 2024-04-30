import { Module } from '@nestjs/common';
import { SheltersController } from './shelters.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ShelterPrismaRepository } from './database/prisma/repositories/shelters-prisma.repository';
import { CreateShelterUseCase } from '../aplication/usecases/createshelter.usecase';
import { ShelterRepository } from '../domain/repositories/shelter.repository';

@Module({
  controllers: [SheltersController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'ShelterRepository',
      useFactory: (prismaService: PrismaService) => {
        return new ShelterPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: CreateShelterUseCase.UseCase,
      useFactory: (reportRepository: ShelterRepository.Repository) => {
        return new CreateShelterUseCase.UseCase(reportRepository);
      },
      inject: ['ShelterRepository'],
    },
  ],
})
export class SheltersModule {}
