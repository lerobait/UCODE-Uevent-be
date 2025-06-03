/*
  Warnings:

  - A unique constraint covering the columns `[stripe_id]` on the table `promo_codes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_coupon_id]` on the table `promo_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promo_codes_stripe_id_key" ON "promo_codes"("stripe_id");

-- CreateIndex
CREATE UNIQUE INDEX "promo_codes_stripe_coupon_id_key" ON "promo_codes"("stripe_coupon_id");
