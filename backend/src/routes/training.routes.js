import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";
import * as training from "../controllers/training.controller.js";

const router = express.Router();
const upload = multer();

/* ===== ADMIN ===== */

// Create module + upload text/pdf files
router.post(
  "/modules",
  auth,
  isAdmin,
  upload.array("files"),
  training.createModule
);

// Get all modules
router.get("/modules", auth, training.getModules);

/* ===== LISTENER ===== */

// Preview a file (no duplicate progress)
router.post("/preview", auth, training.previewFile);

// Get progress bar value
router.get("/progress/:moduleId", auth, training.getProgress);

export default router;
