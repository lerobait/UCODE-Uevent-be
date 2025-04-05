import { Module } from '@nestjs/common';

import { DatabaseService } from '@/core/db/database.service';

import { CompanyNewsController } from './company-news.controller';
import { CompanyNewsService } from './company-news.service';

@Module({
  controllers: [CompanyNewsController],
  providers: [CompanyNewsService, DatabaseService],
})
export class CompanyNewsModule {}
