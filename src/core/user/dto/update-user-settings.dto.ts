import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannelType, UserSettings } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserSettingsDto implements Partial<UserSettings> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  showInAttendeeList?: boolean;

  @ApiProperty({ required: false, enum: NotificationChannelType })
  @IsOptional()
  @IsEnum(NotificationChannelType)
  newCommentChannel?: NotificationChannelType;

  @ApiProperty({ required: false, enum: NotificationChannelType })
  @IsOptional()
  @IsEnum(NotificationChannelType)
  eventReminderChannel?: NotificationChannelType;

  @ApiProperty({ required: false, enum: NotificationChannelType })
  @IsOptional()
  @IsEnum(NotificationChannelType)
  companyUpdateChannel?: NotificationChannelType;

  @ApiProperty({ required: false, enum: NotificationChannelType })
  @IsOptional()
  @IsEnum(NotificationChannelType)
  ticketPurchaseChannel?: NotificationChannelType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  showFollowingList?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  themeMainColor?: string;
}
