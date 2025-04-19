import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { JwtPayload } from '@/core/auth/interface/jwt.interface';
import { GetCurrentUser } from '@/shared/decorators';
import { PaginationOptionsDto } from '@/shared/pagination';

import { PaginatedTickets } from './ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedTickets })
  findAll(
    @Query() dto: PaginationOptionsDto,
    @GetCurrentUser() { sub }: JwtPayload,
  ) {
    return this.ticketsService.findAll(sub, dto);
  }
}
