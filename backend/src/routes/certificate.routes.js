import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import * as certificate from "../controllers/certificate.controller.js";

const router = express.Router();
const upload = multer();

/* ===== LISTENER ===== */

// Upload certificate
router.post(
  "/upload",
  auth,
  upload.single("file"),
  certificate.uploadCertificate
);

// Get own certificates
router.get(
  "/my",
  auth,
  certificate.getCertificates
);

export default router;
