import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CreateShelterDto } from '../aplication/dto/createshelter.dto';
import { UpdateShelterDto } from '../aplication/dto/updateshelter.dto';
import { CreateShelterUseCase } from '../aplication/usecases/createshelter.usecase';
import {
  ShelterCollectionPresenter,
  ShelterPresenter,
} from './presenters/shelter.presenter';
import { ShelterOutput } from '../aplication/dto/shelter-output';
import { ListSheltersUseCase } from '../aplication/usecases/listshelters.usecase';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { ListSheltersDto } from '../aplication/dto/listshelters.dto';
import { UpdateShelterUseCase } from '../aplication/usecases/updateshelter.usecase';
import { DeleteShelterUseCase } from '../aplication/usecases/deleteshelter.usecase';
import { GetShelterUseCase } from '../aplication/usecases/getshelter.usecase';

@Controller('shelters')
export class SheltersController {
  @Inject(CreateShelterUseCase.UseCase)
  private createShelterUseCase: CreateShelterUseCase.UseCase;

  @Inject(ListSheltersUseCase.UseCase)
  private listSheltersUseCase: ListSheltersUseCase.UseCase;

  @Inject(GetShelterUseCase.UseCase)
  private getShelterUseCase: GetShelterUseCase.UseCase;

  @Inject(UpdateShelterUseCase.UseCase)
  private updateShelterUseCase: UpdateShelterUseCase.UseCase;

  @Inject(DeleteShelterUseCase.UseCase)
  private deleteShelterUseCase: DeleteShelterUseCase.UseCase;

  static sheltersToResponse(output: ShelterOutput) {
    return new ShelterPresenter(output);
  }

  static listSheltersToResponse(output: ListSheltersUseCase.Output) {
    return new ShelterCollectionPresenter(output);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createShelterDto: CreateShelterDto) {
    const output = await this.createShelterUseCase.execute(createShelterDto);
    return SheltersController.sheltersToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Get()
  async search(@Query() searchParams: ListSheltersDto) {
    const output = await this.listSheltersUseCase.execute(searchParams);
    return SheltersController.listSheltersToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getShelterUseCase.execute({ id });
    return SheltersController.sheltersToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShelterDto: UpdateShelterDto,
  ) {
    const output = await this.updateShelterUseCase.execute({
      id,
      ...updateShelterDto,
    });

    return SheltersController.sheltersToResponse(output);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteShelterUseCase.execute({ id });
  }
}
