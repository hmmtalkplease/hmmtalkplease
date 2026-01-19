import ChatLog from "../models/chatLog.model.js";

class ChatService {
  async addMessage(sessionId, messageData) {
    const chatLog = await ChatLog.findOneAndUpdate(
      { sessionId },
      { 
        $push: { 
          messages: {
            senderId: messageData.senderId,
            senderRole: messageData.senderRole,
            message: messageData.message
          }
        } 
      },
      { upsert: true, new: true }
    );
    
    return chatLog;
  }

  async getChatHistory(sessionId) {
    const chatLog = await ChatLog.findOne({ sessionId })
      .populate("messages.senderId", "name");
    
    return chatLog ? chatLog.messages : [];
  }

  async deleteChatLog(sessionId) {
    await ChatLog.deleteOne({ sessionId });
  }
}

export default new ChatService();