import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { LocationDto } from '@/shared/dto/location.dto';

export class CreateCompanyDto {
  @ApiProperty({ required: true, example: 'Acme Corporation' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    required: true,
    example: 'Leading provider of event solutions',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @ApiProperty({ required: true, example: 'info@acme.com' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @ApiProperty({ required: true, example: 'https://acme.com' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ required: true, type: LocationDto })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => LocationDto)
  location: LocationDto;
}
