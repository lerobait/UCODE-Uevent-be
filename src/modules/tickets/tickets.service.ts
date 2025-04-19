import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/core/db/database.service';
import { PaginationOptionsDto } from '@/shared/pagination';

import { PaginatedTickets } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(userId: string, dto: PaginationOptionsDto) {
    const data = await this.databaseService.ticket.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        event: true,
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    const count = await this.databaseService.ticket.count({
      where: {
        userId,
      },
    });

    return new PaginatedTickets(data, count, dto);
  }
}
