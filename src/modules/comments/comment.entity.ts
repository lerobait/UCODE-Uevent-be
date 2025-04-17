import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import {
  ClassTransformOptions,
  Exclude,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '@/common/base/base.entity';
import { UserEntity } from '@/core/user/user.entity';
import { Paginated } from '@/shared/pagination';

class CommentDescription implements Comment {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  id: string;
  @ApiProperty({ example: 'This is a comment' })
  content: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  eventId: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  userId: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  parentId: string;
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  companyNewsId: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}

class CommentRelations {
  @Type(() => UserEntity)
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}

export class CommentEntity
  extends IntersectionType(CommentDescription, CommentRelations)
  implements BaseEntity
{
  constructor(data: Comment, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}

export class PaginatedComment extends Paginated<CommentEntity> {
  @Type(() => CommentEntity)
  @ApiProperty({ type: CommentEntity, isArray: true })
  declare items: CommentEntity[];
}
