import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    // 🔐 Who performed the action
    actorId: {
      type: String,
      required: true
    },

    actorRole: {
      type: String,
      enum: ["USER", "LISTENER", "ADMIN"],
      required: true
    },

    // 🔧 What action was performed
    action: {
      type: String,
      required: true
    },

    // 🎯 What entity was affected
    entityType: {
      type: String, // e.g. "LISTENER", "SESSION", "PAYOUT", "TICKET"
      required: true
    },

    entityId: {
      type: String,
      required: true
    },

    // 🧠 Optional extra info (amount, reason, status changes, etc.)
    metadata: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true // createdAt + updatedAt
  }
);

export default mongoose.model("AuditLog", auditLogSchema);
