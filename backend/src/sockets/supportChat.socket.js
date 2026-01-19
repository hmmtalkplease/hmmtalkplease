import SupportTicket from "../models/supportTicket.model.js";
import logAudit from "../utils/auditLogger.js";

export default function supportChatSocket(io) {
  const supportNamespace = io.of("/support-chat");

  supportNamespace.on("connection", (socket) => {
    console.log("Support chat connected:", socket.id);

    socket.on("join-ticket", async ({ ticketId, user }) => {
      socket.join(ticketId);

      await logAudit({
        actorId: user.id,
        actorRole: user.role,
        action: "SUPPORT_CHAT_JOINED",
        entityType: "TICKET",
        entityId: ticketId
      });

      socket.to(ticketId).emit("user-joined-ticket", {
        userId: user.id,
        userRole: user.role,
        timestamp: new Date()
      });
    });

    socket.on("support-message", async (data) => {
      const { ticketId, senderId, senderRole, message } = data;

      await SupportTicket.findByIdAndUpdate(ticketId, {
        $push: {
          messages: {
            senderId,
            senderRole,
            message,
            createdAt: new Date()
          }
        }
      });

      supportNamespace
        .to(ticketId)
        .emit("receive-support-message", {
          ...data,
          timestamp: new Date()
        });
    });

    socket.on("typing", ({ ticketId, userId, userRole }) => {
      socket.to(ticketId).emit("user-typing", { userId, userRole });
    });

    socket.on("stop-typing", ({ ticketId, userId }) => {
      socket.to(ticketId).emit("user-stop-typing", { userId });
    });

    socket.on("disconnect", () => {
      console.log("Support chat disconnected:", socket.id);
    });
  });
}