import prisma from "../prismaClient.js";

/**
 * POST /api/sessions
 * USER requests a session with LISTENER
 */
export const requestSession = async (req, res) => {
  try {
    const userId = req.user.id; // USER ID
    const { listenerId, scheduledAt } = req.body;

    // Check listener exists & approved
    const listener = await prisma.listener.findUnique({
      where: { id: listenerId }
    });

    if (!listener || !listener.approved) {
      return res.status(400).json({ message: "Listener not available" });
    }

    // Prevent double booking
    const conflict = await prisma.session.findFirst({
      where: {
        listenerId,
        scheduledAt: new Date(scheduledAt),
        status: { in: ["PENDING", "ACCEPTED"] }
      }
    });

    if (conflict) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const session = await prisma.session.create({
      data: {
        userId,
        listenerId,
        scheduledAt: new Date(scheduledAt),
        status: "PENDING"
      }
    });

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/sessions/requests
 * LISTENER sees pending requests
 */
export const getSessionRequests = async (req, res) => {
  try {
    const listenerId = req.user.id; // LISTENER ID

    const sessions = await prisma.session.findMany({
      where: {
        listenerId,
        status: "PENDING"
      },
      include: {
        user: {
          select: { id: true, email: true }
        }
      },
      orderBy: { scheduledAt: "asc" }
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/sessions/:id/status
 * LISTENER accepts or rejects
 */
export const updateSessionStatus = async (req, res) => {
  try {
    const listenerId = req.user.id;
    const sessionId = Number(req.params.id);
    const { status } = req.body; // ACCEPTED | REJECTED

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId }
    });

    if (!session || session.listenerId !== listenerId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await prisma.session.update({
      where: { id: sessionId },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/sessions/listener
 * LISTENER sees all their sessions
 */
export const getListenerSessions = async (req, res) => {
  try {
    const listenerId = req.user.id;

    const sessions = await prisma.session.findMany({
      where: { listenerId },
      include: {
        user: {
          select: { id: true, email: true }
        }
      },
      orderBy: { scheduledAt: "asc" }
    });

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
