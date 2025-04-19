import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { JwtPayload } from '@/core/auth/interface/jwt.interface';
import { GetCurrentUser } from '@/shared/decorators';
import { PaginationOptionsDto } from '@/shared/pagination';

import { PaginatedPayments } from './payments.entity';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedPayments })
  findAll(
    @GetCurrentUser() { sub }: JwtPayload,
    @Query() dto: PaginationOptionsDto,
  ) {
    return this.paymentsService.findAll(sub, dto);
  }
}
