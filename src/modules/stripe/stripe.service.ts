import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ApiConfigService } from '@/config/api-config.service';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(private cs: ApiConfigService) {
    this.stripe = new Stripe(this.cs.get('stripe').secretKey);
  }

  constructEvent(payload: string | Buffer, sigHeader: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      sigHeader,
      this.cs.get('stripe').webhookSecret,
    );
  }

  // ACCOUNTS

  async createConnectAccount(data: Stripe.AccountCreateParams) {
    return await this.stripe.accounts.create({
      ...data,
      business_type: 'individual',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      type: 'express',
    });
  }

  async updateConnectAccount(id: string, data: Stripe.AccountUpdateParams) {
    return await this.stripe.accounts.update(id, data);
  }

  async removeConnectAccount(id: string) {
    return await this.stripe.accounts.del(id);
  }

  async createDashboardLink(id: string) {
    return await this.stripe.accounts.createLoginLink(id);
  }

  async createOnboardingLink(id: string) {
    return await this.stripe.accountLinks.create({
      account: id,
      type: 'account_onboarding',
      return_url: 'http://localhost:3000', // TODO Actual FE URL
      refresh_url: 'http://localhost:3000', // TODO Actual FE URL,
    });
  }

  async getConnectAccount(id: string) {
    return await this.stripe.accounts.retrieve(id);
  }

  // ACCOUNTS END

  // PRODUCTS

  async createProduct(data: Stripe.ProductCreateParams, stripeAccount: string) {
    return await this.stripe.products.create(data, {
      stripeAccount,
    });
  }

  async updateProduct(
    id: string,
    data: Stripe.ProductUpdateParams,
    stripeAccount: string,
  ) {
    return await this.stripe.products.update(id, data, {
      stripeAccount,
    });
  }

  async removeProduct(id: string) {
    return await this.stripe.products.del(id);
  }

  // PRODUCTS END

  // PRICES

  async createPrice(data: Stripe.PriceCreateParams, stripeAccount: string) {
    return await this.stripe.prices.create(data, {
      stripeAccount,
    });
  }

  async updatePrice(
    id: string,
    data: Stripe.PriceUpdateParams,
    stripeAccount: string,
  ) {
    return await this.stripe.prices.update(id, data, {
      stripeAccount,
    });
  }

  // PRICES END

  // PAYMENTS

  async createPaymentLink(
    data: Stripe.PaymentLinkCreateParams,
    stripeAccount: string,
  ) {
    return await this.stripe.paymentLinks.create(data, {
      stripeAccount,
    });
  }

  // PAYMENTS END
}
