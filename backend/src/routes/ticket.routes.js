import express from "express";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";
import * as ticket from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/", auth, isAdmin, ticket.getTickets);
router.put("/:id/resolve", auth, isAdmin, ticket.resolveTicket);

export default router;
