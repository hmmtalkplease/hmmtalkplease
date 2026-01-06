import express from "express";
import supportController from "../controllers/support.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { supportValidation } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
  "/ticket",
  auth(["USER"]),
  supportValidation.createTicket,
  supportController.createTicket
);

router.get(
  "/tickets",
  auth(["ADMIN", "LISTENER"]),
  supportController.getTickets
);

router.get(
  "/ticket/:id",
  auth(["ADMIN", "LISTENER", "USER"]),
  supportController.getTicketById
);

router.put(
  "/ticket/:id",
  auth(["ADMIN", "LISTENER"]),
  supportValidation.updateTicket,
  supportController.updateTicketStatus
);

export default router;