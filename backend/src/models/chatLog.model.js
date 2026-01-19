import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    senderRole: {
      type: String,
      enum: ["USER", "LISTENER"],
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const chatLogSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    messages: [chatMessageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("ChatLog", chatLogSchema);