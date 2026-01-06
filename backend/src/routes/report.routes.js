import express from "express";
import reportController from "../controllers/report.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { reportValidation } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
  "/session/:id/report",
  auth(["USER", "LISTENER"]),
  reportValidation.createReport,
  reportController.createReport
);

router.get(
  "/admin",
  auth(["ADMIN"]),
  reportController.getPendingReports
);

router.put(
  "/admin/:id",
  auth(["ADMIN"]),
  reportValidation.updateReportStatus,
  reportController.updateReportStatus
);

export default router;