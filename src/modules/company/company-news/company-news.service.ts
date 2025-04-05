import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@/core/db/database.service';
import { PaginationOptionsDto } from '@/shared/pagination';

import { PaginatedCompanyNewsEntity } from './company-news.entity';
import { CreateCompanyNewsDto } from './dto/create-company-news.dto';
import { UpdateCompanyNewsDto } from './dto/update-company-news.dto';

@Injectable()
export class CompanyNewsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(userId: string, dto: CreateCompanyNewsDto) {
    const company = this.databaseService.company.findUnique({
      where: {
        id: dto.companyId,
        ownerId: userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.databaseService.companyNews.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateCompanyNewsDto, userId: string) {
    const company = this.databaseService.company.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.databaseService.companyNews.update({
      where: {
        id,
      },
      data: {
        ...dto,
        companyId: id,
      },
    });
  }

  async findAllByCompany(companyId: string, dto: PaginationOptionsDto) {
    const data = await this.databaseService.companyNews.findMany({
      where: {
        companyId,
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    const count = await this.databaseService.companyNews.count();

    return PaginatedCompanyNewsEntity.paginate(data, count, dto);
  }

  async findById(id: string) {
    const data = await this.databaseService.companyNews.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('Company news not found');
    }

    return data;
  }

  delete(id: string) {
    return this.databaseService.companyNews
      .delete({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new NotFoundException('Company news not found');
      });
  }
}
