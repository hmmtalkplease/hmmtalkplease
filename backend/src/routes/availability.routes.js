import express from "express";

import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import * as controller from "../controllers/availability.controller.js";

const router = express.Router();

router.post("/", auth, requireRole("LISTENER"), controller.createAvailability);
router.get("/", auth, requireRole("LISTENER"), controller.getAvailability);

export default router;
