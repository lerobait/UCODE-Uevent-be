import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@/core/db/db.module';

import { StripeModule } from '../stripe/stripe.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyNewsModule } from './company-news/company-news.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [CompanyNewsModule, DatabaseModule, StripeModule, ConfigModule],
})
export class CompanyModule {}
