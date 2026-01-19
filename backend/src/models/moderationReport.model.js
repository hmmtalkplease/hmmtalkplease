import mongoose from "mongoose";

const moderationReportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    targetType: {
      type: String,
      enum: ["USER", "MESSAGE", "SESSION"],
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "RESOLVED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ModerationReport", moderationReportSchema);