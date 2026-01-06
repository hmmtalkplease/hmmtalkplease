import AuditLog from "../models/AuditLog.js";

const logAudit = async (data) => {
  try {
    const auditLog = await AuditLog.create({
      actorId: data.actorId,
      actorRole: data.actorRole,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      metadata: data.metadata || {}
    });
    
    console.log(`[AUDIT] ${data.action} by ${data.actorRole}:${data.actorId}`);
    return auditLog;
  } catch (error) {
    console.error("Failed to log audit:", error);
  }
};

export default logAudit;