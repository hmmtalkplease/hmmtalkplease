import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  senderRole: {
    type: String,
    enum: ["USER", "LISTENER", "ADMIN"],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const supportTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
      default: "OPEN"
    },
    messages: [messageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("SupportTicket", supportTicketSchema);