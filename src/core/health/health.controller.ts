import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Request } from 'express';
import { GLOBAL_PREFIX, Prefix } from '../../common/enums/prefix.enum';
import { ApiConfigService } from '../../config/api-config.service';
import { DatabaseService } from '../db/database.service';
import { HealthCheck } from './health.decorator';

@ApiTags('Healthcheck')
@ApiBearerAuth()
@Controller(Prefix.HEALTH)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private cs: ApiConfigService,
    private prisma: DatabaseService,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get state of api. [open for: everyone]' })
  @HealthCheck()
  check(@Req() req: Request) {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'backend',
          `${req.protocol}://${req.get('host')}/${GLOBAL_PREFIX}/${Prefix.HEALTH}/ok`,
        ),
      () => this.db.pingCheck('database', this.prisma),
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.95,
        }),
    ]);
  }

  @Get('frontend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get state of frontend. [open for: everyone]' })
  @HealthCheck()
  checkFrontend() {
    return this.health.check([
      () => this.http.pingCheck('frontend', this.cs.get('app.clientUrl')),
    ]);
  }

  @Get('ok')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get callback from backend. [open for: everyone]' })
  ok() {
    return { ok: true };
  }
}
