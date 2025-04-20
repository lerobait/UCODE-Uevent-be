/*
  Warnings:

  - You are about to drop the column `promo_code_id` on the `tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "promo_code_id";

-- CreateTable
CREATE TABLE "promo_codes" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "max_uses" INTEGER NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "stripe_id" TEXT,

    CONSTRAINT "promo_codes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
