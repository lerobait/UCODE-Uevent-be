-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripe_account_id" TEXT;
