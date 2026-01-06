import AuditLog from "../models/AuditLog.js";

class AuditService {
  async createLog(data) {
    const log = await AuditLog.create({
      actorId: data.actorId,
      actorRole: data.actorRole,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      metadata: data.metadata || {}
    });
    
    return log;
  }

  async getLogs(filters = {}, limit = 100) {
    const query = {};
    
    if (filters.actorId) query.actorId = filters.actorId;
    if (filters.action) query.action = filters.action;
    if (filters.entityType) query.entityType = filters.entityType;
    if (filters.entityId) query.entityId = filters.entityId;
    
    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return logs;
  }
}

export default new AuditService();