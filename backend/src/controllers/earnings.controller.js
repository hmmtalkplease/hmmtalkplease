import { PrismaClient } from '@prisma/client';
import PaymentService from '../services/payment.service.js';

const prisma = new PrismaClient();

// 1. Get Dashboard Stats (Fixed Formula)
export const getDashboardStats = async (req, res) => {
    const { listenerId } = req.params;
    try {
        // A. Total Earnings (Lifetime)
        const totalEarningsAgg = await prisma.earning.aggregate({
            where: { listenerId: Number(listenerId) },
            _sum: { amount: true }
        });
        const totalEarned = Number(totalEarningsAgg._sum.amount || 0);

        // B. Total Withdrawn (Successfully Paid)
        const totalWithdrawnAgg = await prisma.payout.aggregate({
            where: { 
                listenerId: Number(listenerId),
                status: { in: ['APPROVED', 'PAID'] } // Only count finished transactions
            },
            _sum: { amount: true }
        });
        const totalWithdrawn = Number(totalWithdrawnAgg._sum.amount || 0);

        // C. Pending Requests (Money currently stuck in "Requested" status)
        const pendingRequestsAgg = await prisma.payout.aggregate({
            where: { 
                listenerId: Number(listenerId),
                status: 'REQUESTED' 
            },
            _sum: { amount: true }
        });
        const totalPending = Number(pendingRequestsAgg._sum.amount || 0);

        // D. Final Calculation [Matches Document Source: 22]
        // Available = Lifetime Earnings - (Already Paid + Currently Requested)
        const availableBalance = totalEarned - (totalWithdrawn + totalPending);

        res.json({ 
            success: true, 
            totalEarned, 
            totalWithdrawn, 
            totalPending, 
            availableBalance 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Request Withdrawal (Added Limits & Single Request Check)
export const requestWithdrawal = async (req, res) => {
    const { listenerId, amount } = req.body;
    const withdrawAmount = Number(amount);

    try {
        // CHECK 1: Minimum Limit [Document Source: 28]
        if (withdrawAmount < 500) {
            return res.status(400).json({ error: "Minimum withdrawal amount is ₹500" });
        }

        // CHECK 2: Maximum Limit [Document Source: 29]
        if (withdrawAmount > 50000) {
            return res.status(400).json({ error: "Maximum withdrawal amount is ₹50,000" });
        }

        // CHECK 3: Single Active Request Rule [Document Source: 31, 66]
        const existingRequest = await prisma.payout.findFirst({
            where: {
                listenerId: Number(listenerId),
                status: 'REQUESTED'
            }
        });

        if (existingRequest) {
            return res.status(400).json({ error: "You already have a pending withdrawal request. Please wait for it to be processed." });
        }

        // CHECK 4: Insufficient Balance Check
        // We must calculate balance again here to be safe
        const totalEarningsAgg = await prisma.earning.aggregate({
            where: { listenerId: Number(listenerId) },
            _sum: { amount: true }
        });
        const totalWithdrawnAgg = await prisma.payout.aggregate({
            where: { listenerId: Number(listenerId), status: { in: ['APPROVED', 'PAID', 'REQUESTED'] } },
            _sum: { amount: true }
        });
        
        const earned = Number(totalEarningsAgg._sum.amount || 0);
        const used = Number(totalWithdrawnAgg._sum.amount || 0); // Used includes pending now
        const currentBalance = earned - used;

        if (currentBalance < withdrawAmount) {
            return res.status(400).json({ error: "Insufficient wallet balance" });
        }

        // If all checks pass, create the request
        const payoutRequest = await prisma.payout.create({
            data: {
                listenerId: Number(listenerId),
                amount: withdrawAmount,
                status: 'REQUESTED'
            }
        });

        res.json({ success: true, message: "Withdrawal Requested Successfully", data: payoutRequest });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Admin Approve Payout (No Changes needed here)
export const approvePayout = async (req, res) => {
    const { payoutId } = req.body;
    try {
        const request = await prisma.payout.findUnique({ where: { id: Number(payoutId) } });

        if (!request || request.status !== 'REQUESTED') {
            return res.status(400).json({ error: "Invalid Request" });
        }

        const razorpayTransfer = await PaymentService.createPayout("1234567890", request.amount);

        const updated = await prisma.payout.update({
            where: { id: Number(payoutId) },
            data: { 
                status: 'PAID', 
                razorpayPayoutId: razorpayTransfer.id,
                processedAt: new Date()
            }
        });

        res.json({ success: true, message: "Payout Processed", data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};