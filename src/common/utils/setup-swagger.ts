import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { IDDto } from '@/shared/dto';

import { GLOBAL_PREFIX } from '../enums/prefix.enum';

export class Swagger {
  public static createDocument(app: NestExpressApplication) {
    const cfg = Swagger.getConfig().build();

    return SwaggerModule.createDocument(app, cfg, {
      extraModels: [IDDto],
    });
  }

  private static getConfig(): DocumentBuilder {
    return new DocumentBuilder()
      .setTitle('Event Sharing Platphorm API')
      .setDescription('API documentation for the Event Sharing Platform')
      .setVersion('1.0')
      .setLicense('LICENSE', 'https://github.com/mkloz/uevent-backend')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      });
  }

  public static setup(app: NestExpressApplication) {
    SwaggerModule.setup(
      `/${GLOBAL_PREFIX}/docs`,
      app,
      Swagger.createDocument(app),
      {
        customSiteTitle: 'Uevent API Docs',
        customfavIcon: '/api/assets/logo.svg',
      },
    );
  }
}
