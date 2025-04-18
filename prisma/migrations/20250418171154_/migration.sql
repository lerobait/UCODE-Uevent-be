/*
  Warnings:

  - You are about to drop the column `reply_id` on the `comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `user_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_settings_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "reply_id",
ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
