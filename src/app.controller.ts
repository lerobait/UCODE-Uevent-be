import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello! This is the root endpoint. Please use /api for the API. Docs are available at /api/docs.';
  }
}
