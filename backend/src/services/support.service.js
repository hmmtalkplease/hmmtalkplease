import SupportTicket from "../models/supportTicket.model.js";

class SupportService {
  async createTicket(userId, subject) {
    const ticket = await SupportTicket.create({
      userId,
      subject,
      status: "OPEN",
      messages: []
    });
    
    return ticket;
  }

  async getAllTickets(filters = {}) {
    const query = {};
    
    if (filters.status) query.status = filters.status;
    if (filters.userId) query.userId = filters.userId;
    
    const tickets = await SupportTicket.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    
    return tickets;
  }

  async getTicketById(ticketId) {
    const ticket = await SupportTicket.findById(ticketId)
      .populate("userId", "name email");
    
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    
    return ticket;
  }

  async updateTicketStatus(ticketId, status) {
    const ticket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );
    
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    
    return ticket;
  }

  async addMessage(ticketId, senderId, senderRole, message) {
    const ticket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      {
        $push: {
          messages: {
            senderId,
            senderRole,
            message,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    
    return ticket;
  }
}

export default new SupportService();