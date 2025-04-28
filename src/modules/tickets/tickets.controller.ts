import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { Success } from '@/core/auth/dto/success.dto';
import { JwtPayload } from '@/core/auth/interface/jwt.interface';
import { GetCurrentUser } from '@/shared/decorators';
import { IDDto } from '@/shared/dto';
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

  @Post('verify/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Success })
  verifyTicket(@GetCurrentUser() { sub }: JwtPayload, @Param() { id }: IDDto) {
    return this.ticketsService.verifyTicket(id, sub);
  }
}
