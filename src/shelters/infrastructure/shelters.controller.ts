import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
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

@Controller('shelters')
export class SheltersController {
  @Inject(CreateShelterUseCase.UseCase)
  private createShelterUseCase: CreateShelterUseCase.UseCase;

  static sheltersToResponse(output: ShelterOutput) {
    return new ShelterPresenter(output);
  }

  static listSheltersToResponse(output: ListSheltersUseCase.Output) {
    return new ShelterCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createShelterDto: CreateShelterDto) {
    const output = await this.createShelterUseCase.execute(createShelterDto);
    return SheltersController.sheltersToResponse(output);
  }

  @Get()
  findAll() {
    // return this.sheltersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.sheltersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    // return this.sheltersService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.sheltersService.remove(+id);
  }
}
