import { ApiProperty } from '@nestjs/swagger';

export class UrlResponse {
  @ApiProperty({ example: true })
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
