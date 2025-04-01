import { Global, Module, ValidationPipe } from '@nestjs/common';

import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApiConfigModule } from '../../config/api-config.module';
import { ApiConfigService } from '../../config/api-config.service';
import { GlobalExceptionFilter } from './global.filter';
import { GlobalLogger } from './global.logger';

@Global()
@Module({
  imports: [
    ApiConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (cs: ApiConfigService) => ({
        throttlers: [cs.get('app').throttle],
      }),
    }),
  ],
  exports: [GlobalLogger],
  providers: [
    {
      provide: GlobalLogger,
      useFactory: (acs) => new GlobalLogger(acs, 'Global'),
      inject: [ApiConfigService],
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          validateCustomDecorators: true,
          whitelist: true,
        }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class GlobalModule {}
