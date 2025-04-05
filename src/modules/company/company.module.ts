import { Module } from '@nestjs/common';

import { DatabaseService } from '@/core/db/database.service';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyNewsModule } from './company-news/company-news.module';

@Module({
  controllers: [CompanyController],
  providers: [DatabaseService, CompanyService],
  imports: [CompanyNewsModule],
})
export class CompanyModule {}
