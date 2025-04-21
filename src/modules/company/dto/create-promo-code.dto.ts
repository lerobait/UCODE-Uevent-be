import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

import { IDDto } from '@/shared/dto';

export class CreatePromoCodeDto {
  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(1)
  @Max(100)
  discount: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  maxUses: number;
}

export class PromoCodeQueryDto extends IDDto {
  @ApiProperty({ example: 'ckaqbclqnwqwfewgwsef' })
  @IsString()
  promoCodeId: string;
}
