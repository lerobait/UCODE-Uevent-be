import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/core/db/db.module';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [DatabaseModule],
})
export class CommentModule {}
