import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Put,
  HttpCode,
  Patch,
} from '@nestjs/common';
import {
  ReportCollectionPresenter,
  ReportPresenter,
} from './presenters/report.presenter';
import { ReportOutput } from '../aplication/dto/report-output';
import { ListReportsUseCase } from '../aplication/usecases/listreports.usecase';
import { CreateReportDto } from '../aplication/dto/createreport.dto';
import { CreateReportUseCase } from '../aplication/usecases/createreport.usecase';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { GetReportUseCase } from '../aplication/usecases/getreport.usecase';
import { UpdateReportUseCase } from '../aplication/usecases/updatereport.usecase';
import { UpdateReportDto } from '../aplication/dto/updatereport.dto';
import { DeleteReportUseCase } from '../aplication/usecases/deletereport.usecase';
import { UpdateDescriptionDto } from '../aplication/dto/updatedescription.dto';
import { UpdateDescriptionUseCase } from '../aplication/usecases/updatedescription.usecase';
import { UpdateLocationDto } from '../aplication/dto/updatelocation.dto';
import { UpdateLocationUseCase } from '../aplication/usecases/updatelocation.usecase';

@Controller('reports')
export class ReportsController {
  @Inject(CreateReportUseCase.UseCase)
  private createReportUseCase: CreateReportUseCase.UseCase;

  @Inject(GetReportUseCase.UseCase)
  private getReportUseCase: GetReportUseCase.UseCase;

  @Inject(UpdateReportUseCase.UseCase)
  private updateReportUseCase: UpdateReportUseCase.UseCase;

  @Inject(UpdateDescriptionUseCase.UseCase)
  private updateDescriptionUseCase: UpdateDescriptionUseCase.UseCase;

  @Inject(UpdateLocationUseCase.UseCase)
  private updateLocationUseCase: UpdateLocationUseCase.UseCase;

  @Inject(DeleteReportUseCase.UseCase)
  private deleteReportUseCase: DeleteReportUseCase.UseCase;

  static reportToResponse(output: ReportOutput) {
    return new ReportPresenter(output);
  }

  static listReportsToResponse(output: ListReportsUseCase.Output) {
    return new ReportCollectionPresenter(output);
  }

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    const output = await this.createReportUseCase.execute(createReportDto);
    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getReportUseCase.execute({ id });
    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    const output = await this.updateReportUseCase.execute({
      id,
      ...updateReportDto,
    });

    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/description')
  async updateDescription(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    const output = await this.updateDescriptionUseCase.execute({
      id,
      ...updateDescriptionDto,
    });

    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/location')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const output = await this.updateLocationUseCase.execute({
      id,
      ...updateLocationDto,
    });

    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteReportUseCase.execute({ id });
  }
}
