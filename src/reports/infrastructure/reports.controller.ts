import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
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

@Controller('reports')
export class ReportsController {
  @Inject(CreateReportUseCase.UseCase)
  private createReportUseCase: CreateReportUseCase.UseCase;

  @Inject(GetReportUseCase.UseCase)
  private getReportUseCase: GetReportUseCase.UseCase;

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

  @Get()
  findAll() {
    // return this.reportsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getReportUseCase.execute({ id });
    return ReportsController.reportToResponse(output);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: any) {
    // return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.reportsService.remove(+id);
  }
}
