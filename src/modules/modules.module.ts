import { Module } from '@nestjs/common';

import { CompanyModule } from './company/company.module';
import { EventModule } from './event/event.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [CompanyModule, EventModule, StripeModule],
})
export class ModulesModule {}
