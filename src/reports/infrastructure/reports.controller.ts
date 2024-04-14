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
  Query,
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
import { ActiveUserId } from '@/shared/domain/decorators/ActiveUserId';
import { ListReportsDto } from '../aplication/dto/listreports.dto';

@Controller('reports')
export class ReportsController {
  @Inject(CreateReportUseCase.UseCase)
  private createReportUseCase: CreateReportUseCase.UseCase;

  @Inject(ListReportsUseCase.UseCase)
  private listReportsUseCase: ListReportsUseCase.UseCase;

  @Inject(GetReportUseCase.UseCase)
  private getReportUseCase: GetReportUseCase.UseCase;

  @Inject(UpdateReportUseCase.UseCase)
  private updateReportUseCase: UpdateReportUseCase.UseCase;

  @Inject(DeleteReportUseCase.UseCase)
  private deleteReportUseCase: DeleteReportUseCase.UseCase;

  static reportToResponse(output: ReportOutput) {
    return new ReportPresenter(output);
  }

  static listReportsToResponse(output: ListReportsUseCase.Output) {
    return new ReportCollectionPresenter(output);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    const output = await this.createReportUseCase.execute(
      userId,
      createReportDto,
    );
    return ReportsController.reportToResponse(output);
  }

  @UseGuards(AuthGuard)
  @Get()
  async search(
    @ActiveUserId() userId: string,
    @Query() searchParams: ListReportsDto,
  ) {
    const output = await this.listReportsUseCase.execute(userId, searchParams);
    return ReportsController.listReportsToResponse(output);
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
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteReportUseCase.execute({ id });
  }
}
