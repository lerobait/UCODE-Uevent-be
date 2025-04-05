import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Prefix } from '@/common/enums/prefix.enum';
import { JwtPayload } from '@/core/auth/interface/jwt.interface';
import { GetCurrentUser } from '@/shared/decorators';
import { PaginationOptionsDto } from '@/shared/pagination';

import { CompanyNewsEntity } from './company-news.entity';
import { CompanyNewsService } from './company-news.service';
import { CreateCompanyNewsDto } from './dto/create-company-news.dto';
import { UpdateCompanyNewsDto } from './dto/update-company-news.dto';

@Controller(Prefix.COMPANIES_NEWS)
export class CompanyNewsController {
  constructor(private readonly companyNewsService: CompanyNewsService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() dto: CreateCompanyNewsDto,
    @GetCurrentUser() { sub }: JwtPayload,
  ) {
    return new CompanyNewsEntity(
      await this.companyNewsService.create(sub, dto),
    );
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Body() dto: UpdateCompanyNewsDto,
    @Param('id') id: string,
    @GetCurrentUser() { sub }: JwtPayload,
  ) {
    return new CompanyNewsEntity(
      await this.companyNewsService.update(id, dto, sub),
    );
  }

  @ApiBearerAuth()
  @Get('/company/:id')
  getCompanyNews(@Query() dto: PaginationOptionsDto, @Param('id') id: string) {
    return this.companyNewsService.findAllByCompany(id, dto);
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new CompanyNewsEntity(await this.companyNewsService.findById(id));
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return new CompanyNewsEntity(await this.companyNewsService.delete(id));
  }
}
