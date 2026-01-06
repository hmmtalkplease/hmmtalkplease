import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// ================= DB =================
import { connectMongo } from "./config/mongo.js";

// ================= ROUTES =================

// === YOUR WORK ===
import adminRoutes from "./routes/admin.routes.js";
import trainingRoutes from "./routes/training.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

// === PERSON-1 (AUTH & CORE) ===
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import listenerRoutes from "./routes/listener.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import sessionRoutes from "./routes/session.routes.js";

// === PERSON-3 (WALLET & PAYOUTS) ===
import walletRoutes from "./routes/wallet.routes.js";
import payoutRoutes from "./routes/payout.routes.js";

// ================= UTILITIES =================
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();

// ================= GLOBAL MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ================= DATABASE =================
connectMongo(); // Mongo only once (Prisma auto-connects)

// ================= ROUTES =================

// Core Auth & Flow
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listener", listenerRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/sessions", sessionRoutes);

// Your Domain
app.use("/api/admin", adminRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/listener/certificates", certificateRoutes);
app.use("/api/admin/tickets", ticketRoutes);

// Wallet & Payments
app.use("/api/wallet", walletRoutes);
app.use("/api/payments", payoutRoutes);

// ================= HEALTH =================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Internship BurgeonPath API"
  });
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= ERROR =================
app.use(errorHandler);

// ================= LOG =================
logger("🚀 API initialized");

export default app;
