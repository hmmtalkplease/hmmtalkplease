import { Server } from "socket.io";
import sessionChatSocket from "./sessionChat.socket.js";
import supportChatSocket from "./supportChat.socket.js";

export const initSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  sessionChatSocket(io);
  supportChatSocket(io);

  console.log("✅ Chat sockets initialized");
};
