/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'LISTENER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- AlterTable
ALTER TABLE "Listener" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "category",
DROP COLUMN "isAdmin",
DROP COLUMN "language",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "listenerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listenerId" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED',

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "listenerId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_bookingId_key" ON "Session"("bookingId");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "Listener"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "Listener"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "Listener"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
