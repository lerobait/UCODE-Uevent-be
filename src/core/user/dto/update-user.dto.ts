import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string;

  @ApiProperty({ required: false, example: 'This is my bio' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;
}
