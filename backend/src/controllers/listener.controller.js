import prisma from "../prismaClient.js";

/* =====================================================
   LISTENER PROFILE (LISTENER ONLY)
===================================================== */
export const getListenerProfile = async (req, res) => {
  try {
    const listenerId = req.user.id;

    const listener = await prisma.listener.findUnique({
      where: { id: listenerId },
      select: {
        id: true,
        email: true,
        qualifications: true,
        certifications: true,
        approved: true,
        createdAt: true
      }
    });

    if (!listener) {
      return res.status(404).json({ message: "Listener not found" });
    }

    res.json(listener);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   UPDATE LISTENER PROFILE (LISTENER ONLY)
===================================================== */
export const updateListener = async (req, res) => {
  try {
    const listenerId = req.user.id;
    const { qualifications, certifications } = req.body;

    const listener = await prisma.listener.update({
      where: { id: listenerId },
      data: { qualifications, certifications }
    });

    res.json(listener);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   APPROVE LISTENER (ADMIN ONLY)
===================================================== */
export const approveListener = async (req, res) => {
  try {
    const listenerId = Number(req.params.id);

    await prisma.listener.update({
      where: { id: listenerId },
      data: { approved: true }
    });

    res.json({ message: "Listener approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   LISTENER DASHBOARD (LISTENER ONLY)
===================================================== */
export const dashboard = async (req, res) => {
  try {
    const listenerId = req.user.id;

    /* 1️⃣ Total completed sessions */
    const totalSessions = await prisma.session.count({
      where: {
        listenerId,
        status: "COMPLETED"
      }
    });

    /* 2️⃣ Upcoming accepted sessions */
    const upcomingBookings = await prisma.session.findMany({
      where: {
        listenerId,
        status: "ACCEPTED",
        scheduledAt: { gte: new Date() }
      },
      include: {
        user: {
          select: { email: true }
        }
      },
      orderBy: { scheduledAt: "asc" },
      take: 5
    });

    /* 3️⃣ Average rating */
    const ratings = await prisma.rating.aggregate({
      where: { listenerId },
      _avg: { rating: true }
    });

    /* 4️⃣ 7-day session trend */
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const sessionTrend = await prisma.session.groupBy({
      by: ["createdAt"],
      where: {
        listenerId,
        createdAt: { gte: sevenDaysAgo }
      },
      _count: { _all: true }
    });

    res.json({
      totalSessions,
      upcomingBookings,
      averageRating: ratings._avg.rating || 0,
      sessionTrend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
