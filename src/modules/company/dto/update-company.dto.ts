import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ required: false, example: 'Acme Corporation' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    required: false,
    example: 'Leading provider of event solutions',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ required: false, example: 'info@acme.com' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @ApiProperty({ required: false, example: 'https://acme.com' })
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ required: false, example: 'New York, USA' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location: string;
}
