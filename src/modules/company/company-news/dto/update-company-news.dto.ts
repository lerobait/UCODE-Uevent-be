import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCompanyNewsDto {
  @ApiProperty({ required: true, example: 'This is a news title' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ required: true, example: 'This is a news content' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
