import express from "express";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";
import * as admin from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", auth, isAdmin, admin.dashboard);
router.put("/listeners/:id/approve", auth, isAdmin, admin.approveListener);

export default router;
