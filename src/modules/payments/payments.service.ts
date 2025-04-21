import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/core/db/database.service';
import { PaginationOptionsDto } from '@/shared/pagination';

import { PaginatedPayments } from './payments.entity';

@Injectable()
export class PaymentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(userId: string, dto: PaginationOptionsDto) {
    const data = await this.databaseService.payment.findMany({
      where: {
        userId,
      },
      include: {
        ticket: true,
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    const count = await this.databaseService.payment.count({
      where: {
        userId,
      },
    });

    return new PaginatedPayments(data, count, dto);
  }
}
