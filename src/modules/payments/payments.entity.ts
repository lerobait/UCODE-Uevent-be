import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { $Enums, Payment } from '@prisma/client';
import {
  ClassTransformOptions,
  Exclude,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '@/common/base/base.entity';
import { Paginated } from '@/shared/pagination';

import { TicketEntity } from '../tickets/ticket.entity';

class PaymentDescription implements Payment {
  status: $Enums.PaymentStatusType;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  id: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  userId: string;

  @ApiProperty({ example: '2025-04-02T16:27:17Z' })
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ example: 2 })
  amount: number;

  @Exclude()
  paymentIntent: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  ticketId: string;
}

class PaymentRelation {
  @Type(() => TicketEntity)
  @ApiProperty({ type: TicketEntity })
  ticket: TicketEntity;
}

export class PaymentEntity
  extends IntersectionType(PaymentDescription, PaymentRelation)
  implements BaseEntity
{
  constructor(data: Payment, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}

export class PaginatedPayments extends Paginated<Payment> {
  @Type(() => PaymentEntity)
  @ApiProperty({ type: () => PaymentEntity, isArray: true })
  declare items: Payment[];
}
