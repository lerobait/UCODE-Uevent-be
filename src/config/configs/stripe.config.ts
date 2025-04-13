import { z } from 'zod';

import { ConfigValidator } from '../config.validator';

const StripeConfigSchema = z.object({
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
});

export type IStripeConfig = ReturnType<typeof getStripeConfig>;

const getStripeConfig = () => {
  const config = ConfigValidator.validate(process.env, StripeConfigSchema);

  return {
    stripe: {
      secretKey: config.STRIPE_SECRET_KEY,
      webhookSecret: config.STRIPE_WEBHOOK_SECRET,
    },
  };
};

export default getStripeConfig;
