import express from "express";

import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import * as controller from "../controllers/listener.controller.js";

const router = express.Router();

// LISTENER
router.get(
  "/profile",
  auth,
  requireRole("LISTENER"),
  controller.getListenerProfile
);

router.put(
  "/update",
  auth,
  requireRole("LISTENER"),
  controller.updateListener
);

router.get(
  "/dashboard",
  auth,
  requireRole("LISTENER"),
  controller.dashboard
);

// ADMIN
router.put(
  "/approve/:id",
  auth,
  requireRole("ADMIN"),
  controller.approveListener
);

export default router;
