import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ required: false, example: 'Acme Corporation' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({
    required: false,
    example: 'Leading provider of event solutions',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ required: false, example: 'info@acme.com' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @ApiProperty({ required: false, example: 'https://acme.com' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ required: false, example: 'New York, USA' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
