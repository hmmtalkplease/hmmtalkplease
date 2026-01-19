/*
  Warnings:

  - The values [SCHEDULED,CANCELLED] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endTime` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `isBooked` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slot` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listenerId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');
ALTER TABLE "Session" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Session" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "SessionStatus_old";
ALTER TABLE "Session" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_bookingId_fkey";

-- DropIndex
DROP INDEX "Session_bookingId_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "endTime",
DROP COLUMN "isBooked",
DROP COLUMN "startTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slot" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "sessionId" INTEGER;

-- AlterTable
ALTER TABLE "Listener" ALTER COLUMN "qualifications" DROP NOT NULL,
ALTER COLUMN "certifications" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "review" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "bookingId",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "listenerId" INTEGER NOT NULL,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Booking_sessionId_key" ON "Booking"("sessionId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "Listener"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
