-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "language" TEXT,
    "category" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listener" (
    "id" SERIAL NOT NULL,
    "qualifications" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Listener_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Listener_userId_key" ON "Listener"("userId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listener" ADD CONSTRAINT "Listener_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
