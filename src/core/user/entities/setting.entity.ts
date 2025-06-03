import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { $Enums, UserSettings } from '@prisma/client';
import {
  ClassTransformOptions,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '../../../common/base/base.entity';
import { Paginated } from '../../../shared/pagination';
import { UserEntity } from './user.entity';

export class UserSettingDescription implements UserSettings {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  showInAttendeeList: boolean;
  showFollowingList: boolean;
  eventReminderChannel: $Enums.NotificationChannelType;
  ticketPurchaseChannel: $Enums.NotificationChannelType;
  newCommentChannel: $Enums.NotificationChannelType;
  companyUpdateChannel: $Enums.NotificationChannelType;
  themeMainColor: string;
  userId: string;
}

export class UserSettingRelations {
  @Type(() => UserEntity)
  user?: UserEntity;
}

export class UserSettingEntity
  extends IntersectionType(UserSettingDescription, UserSettingRelations)
  implements BaseEntity
{
  constructor(data: UserSettingEntity, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}

export class PaginatedUserSettings extends Paginated<UserSettingEntity> {
  @Type(() => UserSettingEntity)
  @ApiProperty({ type: () => UserSettingEntity, isArray: true })
  declare items: UserSettingEntity[];
}
