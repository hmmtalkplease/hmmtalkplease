import express from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import {
  getBalance,
  addMoney,
  deductMoney
} from "../controllers/wallet.controller.js";

const router = express.Router();

// USER → view own wallet
router.get(
  "/balance/:userId",
  auth,
  requireRole("USER"),
  getBalance
);

// ADMIN → credit wallet
router.post(
  "/add",
  auth,
  requireRole("ADMIN"),
  addMoney
);

// ADMIN → debit wallet
router.post(
  "/deduct",
  auth,
  requireRole("ADMIN"),
  deductMoney
);

export default router;
