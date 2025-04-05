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

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller(Prefix.COMPANIES)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() dto: CreateCompanyDto,
    @GetCurrentUser() { sub }: JwtPayload,
  ) {
    return new CompanyEntity(await this.companyService.create(sub, dto));
  }

  @ApiBearerAuth()
  @Patch('update/:id')
  async update(
    @Body() dto: UpdateCompanyDto,
    @GetCurrentUser() { sub }: JwtPayload,
    @Param('id') id: string,
  ) {
    return new CompanyEntity(await this.companyService.update(id, dto, sub));
  }

  @ApiBearerAuth()
  @Get('my')
  async findAll(
    @GetCurrentUser() { sub }: JwtPayload,
    @Query() dto: GetCompanyDto,
  ) {
    return this.companyService.findAll(sub, dto);
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new CompanyEntity(await this.companyService.findById(id));
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@GetCurrentUser() { sub }: JwtPayload, @Param('id') id: string) {
    return new CompanyEntity(await this.companyService.delete(id, sub));
  }
}
