import ModerationReport from "../models/moderationReport.model.js";

class ReportService {
  async createReport(data) {
    const report = await ModerationReport.create({
      sessionId: data.sessionId,
      reportedBy: data.reportedBy,
      targetId: data.targetId || data.sessionId,
      targetType: data.targetType || "SESSION",
      reason: data.reason,
      status: "PENDING"
    });
    
    return report;
  }

  async getPendingReports() {
    const reports = await ModerationReport.find({ status: "PENDING" })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
    
    return reports;
  }

  async updateReportStatus(reportId, status) {
    const report = await ModerationReport.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );
    
    if (!report) {
      throw new Error("Report not found");
    }
    
    return report;
  }

  async getReportById(reportId) {
    const report = await ModerationReport.findById(reportId)
      .populate("reportedBy", "name email");
    
    if (!report) {
      throw new Error("Report not found");
    }
    
    return report;
  }
}

export default new ReportService();