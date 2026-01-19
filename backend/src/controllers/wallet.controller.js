import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get Wallet Balance
export const getBalance = async (req, res) => {
    const { userId } = req.params;
    try {
        const wallet = await prisma.wallet.findUnique({
            where: { userId: Number(userId) }
        });

        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        res.json({ balance: wallet.balance, currency: wallet.currency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Money (Credit)
export const addMoney = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        // 1. Update Wallet
        const wallet = await prisma.wallet.upsert({
            where: { userId: Number(userId) },
            update: { balance: { increment: amount } },
            create: { userId: Number(userId), balance: amount }
        });

        // 2. Record Transaction
        await prisma.transaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                type: "CREDIT",
                status: "SUCCESS"
            }
        });

        res.json({ success: true, balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deduct Money (Debit)
export const deductMoney = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const wallet = await prisma.wallet.findUnique({ where: { userId: Number(userId) } });

        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient Balance" });
        }

        const updatedWallet = await prisma.wallet.update({
            where: { userId: Number(userId) },
            data: { balance: { decrement: amount } }
        });

        await prisma.transaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                type: "DEBIT",
                status: "SUCCESS"
            }
        });

        res.json({ success: true, balance: updatedWallet.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};