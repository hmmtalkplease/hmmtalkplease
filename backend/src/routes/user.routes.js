import express from "express";

import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

// USER
router.get(
  "/profile",
  auth,
  requireRole("USER"),
  controller.getProfile
);

router.put(
  "/profile",
  auth,
  requireRole("USER"),
  controller.updateProfile
);

router.put(
  "/deactivate",
  auth,
  requireRole("USER"),
  controller.deactivateProfile
);

export default router;
