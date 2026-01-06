import { pool } from "../config/postgres.js";
import AuditLog from "../models/AuditLog.js";

/**
 * GET /api/admin/dashboard
 */
export const dashboard = async (req, res) => {
  try {
    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users WHERE isActive = true"
    );

    const listenersResult = await pool.query(`
      SELECT 
        approved, 
        COUNT(*) 
      FROM listeners 
      GROUP BY approved
    `);

    res.json({
      totalUsers: Number(usersResult.rows[0].count),
      listeners: listenersResult.rows.map(row => ({
        approved: row.approved,
        count: Number(row.count)
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/**
 * PUT /api/admin/listeners/approve/:id
 */
export const approveListener = async (req, res) => {
  try {
    const listenerId = req.params.id;

    await pool.query(
      "UPDATE listeners SET approved = true WHERE id = $1",
      [listenerId]
    );

    await AuditLog.create({
      adminId: req.user.id,
      action: "APPROVE_LISTENER",
      targetId: listenerId
    });

    res.json({ message: "Listener approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Listener approval failed" });
  }
};
