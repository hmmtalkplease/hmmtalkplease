import express from "express";

import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import * as controller from "../controllers/session.controller.js";

const router = express.Router();

/* ================= USER ================= */

// USER requests a session with a listener
router.post(
  "/request",
  auth,
  requireRole("USER"),
  controller.requestSession
);

/* ================= LISTENER ================= */

// LISTENER views pending session requests
router.get(
  "/requests",
  auth,
  requireRole("LISTENER"),
  controller.getSessionRequests
);

// LISTENER accepts or rejects a session
router.put(
  "/:id",
  auth,
  requireRole("LISTENER"),
  controller.updateSessionStatus
);

// LISTENER views all their sessions
router.get(
  "/",
  auth,
  requireRole("LISTENER"),
  controller.getListenerSessions
);

export default router;
