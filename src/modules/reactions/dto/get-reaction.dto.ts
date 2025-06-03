import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetReactionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  newsId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commentId?: string;
}
