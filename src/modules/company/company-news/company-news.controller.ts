import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';

import { Prefix } from '@/common/enums/prefix.enum';
import { Success } from '@/core/auth/dto/success.dto';
import { JwtPayload } from '@/core/auth/interface/jwt.interface';
import {
  IMG_ALLOWED_TYPES,
  IMG_MAX_SIZE,
} from '@/core/file-upload/file-upload.contsants';
import {
  UploadFileSizeValidator,
  UploadFileTypeValidator,
} from '@/core/file-upload/validators';
import { GetCurrentUser, Public } from '@/shared/decorators';
import { IDDto } from '@/shared/dto';
import { PaginationOptionsDto } from '@/shared/pagination';

import {
  CompanyNewsEntity,
  PaginatedCompanyNewsEntity,
} from './company-news.entity';
import { CompanyNewsService } from './company-news.service';
import { CreateCompanyNewsDto } from './dto/create-company-news.dto';
import { UpdateCompanyNewsDto } from './dto/update-company-news.dto';

@Controller(Prefix.COMPANIES_NEWS)
export class CompanyNewsController {
  constructor(private readonly companyNewsService: CompanyNewsService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyNewsEntity })
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
  @ApiOkResponse({ type: CompanyNewsEntity })
  @Patch(':id')
  async update(
    @Body() dto: UpdateCompanyNewsDto,
    @Param() { id }: IDDto,
    @GetCurrentUser() { sub }: JwtPayload,
  ) {
    return new CompanyNewsEntity(
      await this.companyNewsService.update(id, dto, sub),
    );
  }

  @ApiOkResponse({ type: PaginatedCompanyNewsEntity, isArray: true })
  @Public()
  @Get('/company/:id')
  getCompanyNews(@Query() dto: PaginationOptionsDto, @Param() { id }: IDDto) {
    return this.companyNewsService.findAllByCompany(id, dto);
  }

  @Public()
  @ApiOkResponse({ type: CompanyNewsEntity })
  @Get(':id')
  async findOne(@Param() { id }: IDDto) {
    return new CompanyNewsEntity(await this.companyNewsService.findById(id));
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyNewsEntity })
  @Delete(':id')
  async delete(@Param() { id }: IDDto, @GetCurrentUser() { sub }: JwtPayload) {
    return new CompanyNewsEntity(await this.companyNewsService.delete(sub, id));
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Success })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('cover'))
  @Patch(':id/cover')
  async updateCover(
    @Param() { id }: IDDto,
    @GetCurrentUser() { sub }: JwtPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new UploadFileTypeValidator({ fileType: IMG_ALLOWED_TYPES }),
        )
        .addValidator(new UploadFileSizeValidator({ maxSize: IMG_MAX_SIZE }))
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: true,
        }),
    )
    cover: Express.Multer.File,
  ) {
    return this.companyNewsService.updateCover(id, sub, cover);
  }
}
