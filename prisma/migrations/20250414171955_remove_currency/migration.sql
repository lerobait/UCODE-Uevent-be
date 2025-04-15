/*
  Warnings:

  - You are about to drop the column `currency` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "currency";
