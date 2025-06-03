/*
  Warnings:

  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_number` on the `tickets` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tickets_ticket_number_idx";

-- DropIndex
DROP INDEX "tickets_ticket_number_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "payment_method";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticket_number";
