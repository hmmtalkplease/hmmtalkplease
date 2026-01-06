import ChatLog from "../models/chatLog.model.js";
import logAudit from "../utils/auditLogger.js";
import { 
  startSessionTimer, 
  endSessionTimer, 
  getSessionDuration 
} from "../utils/sessionTimer.js";

export default function sessionChatSocket(io) {
  const sessionNamespace = io.of("/session-chat");

  sessionNamespace.on("connection", (socket) => {
    console.log("Session chat connected:", socket.id);

    socket.on("join-session", async ({ sessionId, userId, role }) => {
      socket.join(sessionId);
      await startSessionTimer(sessionId);

      await logAudit({
        actorId: userId,
        actorRole: role,
        action: "SESSION_JOINED",
        entityType: "SESSION",
        entityId: sessionId
      });

      sessionNamespace.to(sessionId).emit("user-joined", {
        userId,
        role,
        timestamp: new Date()
      });
    });

    socket.on("send-message", async (data) => {
      await ChatLog.findOneAndUpdate(
        { sessionId: data.sessionId },
        { $push: { messages: data } },
        { upsert: true }
      );

      sessionNamespace
        .to(data.sessionId)
        .emit("receive-message", data);
    });

    socket.on("get-session-duration", async ({ sessionId }, callback) => {
      const duration = await getSessionDuration(sessionId);
      callback({ duration });
    });

    socket.on("end-session", async ({ sessionId, userId, role }) => {
      const duration = await endSessionTimer(sessionId);

      await logAudit({
        actorId: userId,
        actorRole: role,
        action: "SESSION_ENDED",
        entityType: "SESSION",
        entityId: sessionId,
        metadata: { duration }
      });

      sessionNamespace.to(sessionId).emit("session-ended", {
        duration,
        timestamp: new Date()
      });
    });

    socket.on("call-offer", (data) => {
      socket.to(data.sessionId).emit("call-offer", data);
    });

    socket.on("call-answer", (data) => {
      socket.to(data.sessionId).emit("call-answer", data);
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.sessionId).emit("ice-candidate", data);
    });

    socket.on("disconnect", () => {
      console.log("Session chat disconnected:", socket.id);
    });
  });
}