import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/db/db.module';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [DatabaseModule],
})
export class PaymentsModule {}
