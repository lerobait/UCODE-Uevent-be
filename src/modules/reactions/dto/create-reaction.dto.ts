import { ApiProperty } from '@nestjs/swagger';
import { ReactionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateReactionDto {
  @ApiProperty({
    required: false,
    enum: ReactionType,
    default: ReactionType.LIKE,
  })
  @IsOptional()
  @IsEnum(ReactionType)
  type?: ReactionType;

  @ApiProperty({ required: false, example: 'cl8d2k3f7000012xj5wl8a2hj' })
  @IsString()
  @IsOptional()
  commentId?: string;

  @ApiProperty({ required: false, example: 'cl8d2k3f7000012xj5wl8a2hj' })
  @IsString()
  @IsOptional()
  newsId?: string;
}
