import express from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import {
  getDashboardStats,
  requestWithdrawal,
  approvePayout
} from "../controllers/earnings.controller.js";

const router = express.Router();

// LISTENER → dashboard
router.get(
  "/listener/stats/:listenerId",
  auth,
  requireRole("LISTENER"),
  getDashboardStats
);

// LISTENER → withdraw
router.post(
  "/withdraw/request",
  auth,
  requireRole("LISTENER"),
  requestWithdrawal
);

// ADMIN → approve payout
router.post(
  "/admin/payout/approve",
  auth,
  requireRole("ADMIN"),
  approvePayout
);

export default router;
