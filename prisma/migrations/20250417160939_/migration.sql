/*
  Warnings:

  - You are about to drop the column `location` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `event_locations` table. All the data in the column will be lost.
  - You are about to drop the column `company_update_channel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `event_reminder_channel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `new_comment_channel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `show_in_attendee_list` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_purchase_channel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `event_themes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promo_codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `themes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[company_news_id,user_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id,user_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location_id]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventThemeType" AS ENUM ('ART', 'MUSIC', 'TECHNOLOGY', 'BUSINESS', 'EDUCATION', 'HEALTH', 'SPORTS', 'FOOD', 'TRAVEL', 'FASHION', 'CULTURE', 'SCIENCE', 'ENVIRONMENT', 'ENTERTAINMENT', 'POLITICS', 'SOCIAL', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventFormatType" ADD VALUE 'SEMINAR';
ALTER TYPE "EventFormatType" ADD VALUE 'MEETUP';
ALTER TYPE "EventFormatType" ADD VALUE 'PANEL_DISCUSSION';
ALTER TYPE "EventFormatType" ADD VALUE 'WEBINAR';
ALTER TYPE "EventFormatType" ADD VALUE 'NETWORKING';
ALTER TYPE "EventFormatType" ADD VALUE 'PERFORMANCE';
ALTER TYPE "EventFormatType" ADD VALUE 'EXHIBITION';
ALTER TYPE "EventFormatType" ADD VALUE 'COMPETITION';
ALTER TYPE "EventFormatType" ADD VALUE 'PARTY';
ALTER TYPE "EventFormatType" ADD VALUE 'CEREMONY';
ALTER TYPE "EventFormatType" ADD VALUE 'TRAINING';

-- DropForeignKey
ALTER TABLE "event_locations" DROP CONSTRAINT "event_locations_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_themes" DROP CONSTRAINT "event_themes_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_themes" DROP CONSTRAINT "event_themes_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "promo_codes" DROP CONSTRAINT "promo_codes_event_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_promo_code_id_fkey";

-- DropIndex
DROP INDEX "event_locations_event_id_key";

-- DropIndex
DROP INDEX "reactions_news_id_user_id_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "location",
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_locations" DROP COLUMN "event_id";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "location_id" TEXT,
ADD COLUMN     "themes" "EventThemeType"[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "company_update_channel",
DROP COLUMN "event_reminder_channel",
DROP COLUMN "new_comment_channel",
DROP COLUMN "show_in_attendee_list",
DROP COLUMN "ticket_purchase_channel",
ADD COLUMN     "settings_id" TEXT;

-- DropTable
DROP TABLE "event_themes";

-- DropTable
DROP TABLE "promo_codes";

-- DropTable
DROP TABLE "themes";

-- DropEnum
DROP TYPE "DiscountType";

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "show_in_attendee_list" BOOLEAN NOT NULL DEFAULT true,
    "show_following_list" BOOLEAN NOT NULL DEFAULT true,
    "event_reminder_channel" "NotificationChannelType" NOT NULL DEFAULT 'BOTH',
    "ticket_purchase_channel" "NotificationChannelType" NOT NULL DEFAULT 'BOTH',
    "new_comment_channel" "NotificationChannelType" NOT NULL DEFAULT 'IN_APP',
    "company_update_channel" "NotificationChannelType" NOT NULL DEFAULT 'IN_APP',
    "theme_main_color" TEXT,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_company_news_id_user_id_key" ON "comments"("company_news_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_event_id_user_id_key" ON "comments"("event_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_location_id_key" ON "companies"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_location_id_key" ON "events"("location_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_settings_id_fkey" FOREIGN KEY ("settings_id") REFERENCES "user_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "event_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "event_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
