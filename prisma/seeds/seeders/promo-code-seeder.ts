import { faker } from '@faker-js/faker';
import type { Company, PrismaClient } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import { getRandomInt } from '../utils/helpers';

// Seed promo codes using createMany
export async function seedPromoCodes(
  prisma: PrismaClient,
  companies: Company[],
): Promise<void> {
  console.log('Creating promo codes...');

  const promoCodeCreateData = [];

  for (const company of companies) {
    // Skip companies without Stripe account
    if (!company.stripeAccountId || !company.isVerified) continue;

    const promoCount = getRandomInt(
      SEED_CONFIG.promoCodesPerCompany.min,
      SEED_CONFIG.promoCodesPerCompany.max,
    );

    for (let i = 0; i < promoCount; i++) {
      // Generate promo code data
      const code = faker.string.alphanumeric(8).toUpperCase();
      const maxUses = getRandomInt(10, 100);
      const uses = getRandomInt(0, maxUses);
      const discount = getRandomInt(5, 50);

      promoCodeCreateData.push({
        code,
        maxUses,
        uses,
        discount,
        stripeId: `promo_${faker.string.alphanumeric(14)}`,
        stripeCouponId: `coupon_${faker.string.alphanumeric(14)}`,
        companyId: company.id,
      });
    }
  }

  // Use createMany to insert all promo codes at once
  if (promoCodeCreateData.length > 0) {
    await prisma.promoCode.createMany({
      data: promoCodeCreateData,
    });
  }

  console.log(`Created ${promoCodeCreateData.length} promo codes`);
}
