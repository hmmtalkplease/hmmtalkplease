import supportService from "../services/support.service.js";
import logAudit from "../utils/auditLogger.js";

class SupportController {
  async createTicket(req, res) {
    try {
      const ticket = await supportService.createTicket(
        req.user.id,
        req.body.subject
      );

      await logAudit({
        actorId: req.user.id,
        actorRole: "USER",
        action: "SUPPORT_TICKET_CREATED",
        entityType: "TICKET",
        entityId: ticket._id.toString()
      });

      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTickets(req, res) {
    try {
      const filters = {};
      
      if (req.query.status) {
        filters.status = req.query.status;
      }
      
      const tickets = await supportService.getAllTickets(filters);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTicketById(req, res) {
    try {
      const ticket = await supportService.getTicketById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateTicketStatus(req, res) {
    try {
      const ticket = await supportService.updateTicketStatus(
        req.params.id,
        req.body.status
      );

      await logAudit({
        actorId: req.user.id,
        actorRole: req.user.role,
        action: "SUPPORT_TICKET_UPDATED",
        entityType: "TICKET",
        entityId: ticket._id.toString(),
        metadata: { status: req.body.status }
      });

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SupportController();