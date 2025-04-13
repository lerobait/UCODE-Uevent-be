import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/db/db.module';

import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
