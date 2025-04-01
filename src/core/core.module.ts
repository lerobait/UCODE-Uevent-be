import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config/api-config.module';
import { CronModule } from './cron/cron.module';
import { DbModule } from './db/db.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { GlobalModule } from './global/global.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ApiConfigModule,
    GlobalModule,
    DbModule,
    CronModule,
    MailModule,
    FileUploadModule,
    HealthModule,
  ],
})
export class CoreModule {}
