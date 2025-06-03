/*
  Warnings:

  - Added the required column `stripe_coupon_id` to the `promo_codes` table without a default value. This is not possible if the table is not empty.
  - Made the column `stripe_id` on table `promo_codes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "promo_codes" ADD COLUMN     "stripe_coupon_id" TEXT NOT NULL,
ALTER COLUMN "stripe_id" SET NOT NULL;
