import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/db/db.module';

import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService],
  imports: [DatabaseModule],
})
export class ReactionModule {}
