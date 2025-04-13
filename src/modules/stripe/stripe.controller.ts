import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import Stripe from 'stripe';

import { DatabaseService } from '@/core/db/database.service';
import { Public } from '@/shared/decorators';

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Public()
  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException();
    }

    const body = req.rawBody;
    let event: Stripe.Event;

    try {
      event = this.stripeService.constructEvent(body, signature);
    } catch {
      throw new BadRequestException();
    }

    switch (event.type) {
      case 'account.updated': {
        const metadata = event.data.object.metadata;
        const isActive =
          event.data.object.charges_enabled &&
          event.data.object.payouts_enabled;

        if (!isActive) {
          return;
        }

        if (!metadata.company) {
          return;
        }

        await this.databaseService.company.update({
          where: {
            id: metadata.company,
          },
          data: {
            isVerified: true,
          },
        });

        break;
      }

      default:
        break;
    }
  }
}
