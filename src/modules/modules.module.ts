import { Module } from '@nestjs/common';

import { CommentModule } from './comments/comment.module';
import { CompanyModule } from './company/company.module';
import { EventModule } from './event/event.module';
import { ReactionModule } from './reactions/reaction.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    CompanyModule,
    EventModule,
    StripeModule,
    CommentModule,
    ReactionModule,
  ],
})
export class ModulesModule {}
