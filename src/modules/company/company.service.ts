import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Success } from '@/core/auth/dto/success.dto';
import { UrlResponse } from '@/core/auth/dto/url.dto';
import { DatabaseService } from '@/core/db/database.service';

import { StripeService } from '../stripe/stripe.service';
import { PaginatedCompany } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly stripeService: StripeService,
  ) {}

  async create(userId: string, dto: CreateCompanyDto) {
    return await this.databaseService.$transaction(async (prisma) => {
      const company = await prisma.company.create({
        data: {
          ...dto,
          ownerId: userId,
        },
      });
      const account = await this.stripeService.createConnectAccount({
        business_profile: {
          name: dto.name,
          support_email: dto.email,
          product_description: dto.description,
        },
        metadata: {
          ownerId: userId,
          company: company.id,
        },
      });

      const updatedCompany = await prisma.company.update({
        where: {
          id: company.id,
        },
        data: {
          stripeAccountId: account.id,
        },
      });

      return updatedCompany;
    });
  }

  async update(id: string, dto: UpdateCompanyDto, userId: string) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.databaseService.company.update({
      where: {
        id,
        ownerId: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async findAll(dto: GetCompanyDto) {
    const data = await this.databaseService.company.findMany({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    const count = await this.databaseService.company.count();

    return new PaginatedCompany(data, count, dto);
  }

  async findAllByUserId(
    userId: string,
    dto: GetCompanyDto,
  ): Promise<PaginatedCompany> {
    const data = await this.databaseService.company.findMany({
      where: {
        ownerId: userId,
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });

    const count = await this.databaseService.company.count({
      where: {
        ownerId: userId,
      },
    });

    return new PaginatedCompany(data, count, dto);
  }

  async findById(id: string) {
    const data = await this.databaseService.company.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('Company not found');
    }

    return data;
  }

  async delete(id: string, userId: string) {
    return this.databaseService.company
      .delete({
        where: {
          id,
          ownerId: userId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Company not found');
      });
  }

  async createOnboardingLink(id: string, userId: string) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const data = await this.stripeService.createOnboardingLink(
      company.stripeAccountId,
    );

    return new UrlResponse(data.url);
  }

  async createDashboardLink(id: string, userId: string) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const data = await this.stripeService.createDashboardLink(
      company.stripeAccountId,
    );

    return new UrlResponse(data.url);
  }

  async subscribe(companyId: string, userId: string) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    try {
      await this.databaseService.companySubscription.create({
        data: { userId, companyId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Already subscribed');
        }
      }

      throw error;
    }

    return new Success();
  }

  async unsubscribe(companyId: string, userId: string) {
    const company = await this.databaseService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    try {
      await this.databaseService.companySubscription.delete({
        where: {
          userId_companyId: {
            userId,
            companyId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Not subscribed');
        }
      }

      throw error;
    }

    return new Success();
  }
}
