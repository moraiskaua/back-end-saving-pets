import { Module } from '@nestjs/common';
import { SheltersController } from './shelters.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ShelterPrismaRepository } from './database/prisma/repositories/shelters-prisma.repository';
import { CreateShelterUseCase } from '../aplication/usecases/createshelter.usecase';
import { ShelterRepository } from '../domain/repositories/shelter.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { ListSheltersUseCase } from '../aplication/usecases/listshelters.usecase';

@Module({
  imports: [AuthModule],
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
      useFactory: (shelterRepository: ShelterRepository.Repository) => {
        return new CreateShelterUseCase.UseCase(shelterRepository);
      },
      inject: ['ShelterRepository'],
    },
    {
      provide: ListSheltersUseCase.UseCase,
      useFactory: (shelterRepository: ShelterRepository.Repository) => {
        return new ListSheltersUseCase.UseCase(shelterRepository);
      },
      inject: ['ShelterRepository'],
    },
  ],
})
export class SheltersModule {}
