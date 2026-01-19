import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const isMock = process.env.USE_MOCK_PAYMENTS === "true";

let instance = null;

if (!isMock) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

const PaymentService = {
  createOrder: async (amount, currency = "INR") => {
    if (isMock) {
      return {
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency,
        status: "created"
      };
    }

    if (!instance) {
      throw new Error("Razorpay not initialized");
    }

    return await instance.orders.create({
      amount: amount * 100,
      currency
    });
  },

  createPayout: async (accountNumber, amount) => {
    if (isMock) {
      return {
        id: `payout_mock_${Date.now()}`,
        amount: amount * 100,
        status: "processed"
      };
    }

    // 🔔 Real RazorpayX payout comes later
    return {
      id: "payout_pending",
      status: "processing"
    };
  }
};

export default PaymentService;
