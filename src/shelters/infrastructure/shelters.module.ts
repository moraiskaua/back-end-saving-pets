import { Module } from '@nestjs/common';
import { SheltersController } from './shelters.controller';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { ShelterPrismaRepository } from './database/prisma/repositories/shelter-prisma.repository';
import { CreateShelterUseCase } from '../aplication/usecases/createshelter.usecase';
import { ShelterRepository } from '../domain/repositories/shelter.repository';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { ListSheltersUseCase } from '../aplication/usecases/listshelters.usecase';
import { UpdateShelterUseCase } from '../aplication/usecases/updateshelter.usecase';
import { DeleteShelterUseCase } from '../aplication/usecases/deleteshelter.usecase';
import { GetShelterUseCase } from '../aplication/usecases/getshelter.usecase';

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
    {
      provide: GetShelterUseCase.UseCase,
      useFactory: (shelterRepository: ShelterRepository.Repository) => {
        return new GetShelterUseCase.UseCase(shelterRepository);
      },
      inject: ['ShelterRepository'],
    },
    {
      provide: UpdateShelterUseCase.UseCase,
      useFactory: (shelterRepository: ShelterRepository.Repository) => {
        return new UpdateShelterUseCase.UseCase(shelterRepository);
      },
      inject: ['ShelterRepository'],
    },
    {
      provide: DeleteShelterUseCase.UseCase,
      useFactory: (shelterRepository: ShelterRepository.Repository) => {
        return new DeleteShelterUseCase.UseCase(shelterRepository);
      },
      inject: ['ShelterRepository'],
    },
  ],
})
export class SheltersModule {}
