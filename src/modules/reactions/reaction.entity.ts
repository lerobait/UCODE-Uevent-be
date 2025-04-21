import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Reaction, ReactionType } from '@prisma/client';
import {
  ClassTransformOptions,
  Exclude,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '@/common/base/base.entity';
import { UserEntity } from '@/core/user/entities/user.entity';

import { CommentEntity } from '../comments/comment.entity';
import { CompanyNewsEntity } from '../company/company-news/company-news.entity';

class ReactionDescription implements Reaction {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  id: string;
  @ApiProperty({
    enum: ReactionType,
  })
  type: ReactionType;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  userId: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  commentId: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  newsId: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}

class ReactionRelations {
  @Type(() => UserEntity)
  // @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @Type(() => CommentEntity)
  // @ApiProperty({ required: false, type: CommentEntity })
  comment?: CommentEntity;

  @Type(() => CompanyNewsEntity)
  // @ApiProperty({ required: false, type: CompanyNewsEntity })
  news?: CompanyNewsEntity;
}

export class ReactionEntity
  extends IntersectionType(ReactionDescription, ReactionRelations)
  implements BaseEntity
{
  constructor(data: Reaction, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}
