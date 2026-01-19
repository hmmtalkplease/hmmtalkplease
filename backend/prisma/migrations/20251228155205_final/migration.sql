/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Listener` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[listenerId,date,slot]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Listener` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Listener` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Listener` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Listener" DROP CONSTRAINT "Listener_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropIndex
DROP INDEX "Listener_userId_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Listener" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_listenerId_date_slot_key" ON "Availability"("listenerId", "date", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "Listener_email_key" ON "Listener"("email");

-- CreateIndex
CREATE INDEX "Rating_listenerId_idx" ON "Rating"("listenerId");
