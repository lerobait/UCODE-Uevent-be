import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/db/db.module';

import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [DatabaseModule],
})
export class TicketsModule {}
