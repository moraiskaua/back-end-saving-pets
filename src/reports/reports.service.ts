import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  create(createReportDto: any) {
    return 'This action adds a new report';
  }

  findAll() {
    return 'This action returns all reports';
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: any) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
