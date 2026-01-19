import reportService from "../services/report.service.js";
import logAudit from "../utils/auditLogger.js";

class ReportController {
  async createReport(req, res) {
    try {
      const report = await reportService.createReport({
        sessionId: req.params.id,
        reportedBy: req.user.id,
        reason: req.body.reason
      });

      await logAudit({
        actorId: req.user.id,
        actorRole: req.user.role,
        action: "REPORT_CREATED",
        entityType: "REPORT",
        entityId: report._id.toString()
      });

      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPendingReports(req, res) {
    try {
      const reports = await reportService.getPendingReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateReportStatus(req, res) {
    try {
      const report = await reportService.updateReportStatus(
        req.params.id,
        req.body.status
      );

      await logAudit({
        actorId: req.user.id,
        actorRole: "ADMIN",
        action: "REPORT_UPDATED",
        entityType: "REPORT",
        entityId: report._id.toString(),
        metadata: { status: req.body.status }
      });

      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ReportController();