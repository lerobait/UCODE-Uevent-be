import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  address: string;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -74.006 })
  @IsNumber()
  lng: number;
}
