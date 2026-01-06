import Ticket from "../models/Ticket.js";

/**
 * GET /api/admin/tickets
 * Fetch all support tickets
 */
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

/**
 * PUT /api/admin/tickets/:id/resolve
 * Resolve a support ticket
 */
export const resolveTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: "RESOLVED" },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket resolved",
      ticket
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to resolve ticket" });
  }
};
