import prisma from "../prismaClient.js";
import redis from "../config/redis.js";

/**
 * POST /api/availability
 * Listener sets availability (max 7 days ahead)
 */
export const createAvailability = async (req, res) => {
  try {
    const listenerId = req.user.id;
    const { date, startTime, endTime } = req.body;

    // Combine times into single slot string
    const slotString = `${startTime}-${endTime}`;

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    if (new Date(date) > maxDate) {
      return res.status(400).json({
        message: "Only next 7 days allowed"
      });
    }

    // Check slot conflict
    const conflict = await prisma.availability.findFirst({
      where: {
        listenerId,
        date: new Date(date),
        slot: slotString
      }
    });

    if (conflict) {
      return res.status(409).json({
        message: "Slot conflict"
      });
    }

    // Create availability
    const availability = await prisma.availability.create({
      data: {
        listenerId,
        date: new Date(date),
        slot: slotString
      }
    });

    // Clear cached availability
    await redis.del(`availability:${listenerId}`);

    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Availability error"
    });
  }
};

/**
 * GET /api/availability
 * Get listener availability (cached)
 */
export const getAvailability = async (req, res) => {
  try {
    const listenerId = req.user.id;

    const cached = await redis.get(`availability:${listenerId}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const availability = await prisma.availability.findMany({
      where: { listenerId },
      orderBy: { date: "asc" }
    });

    // Cache for 5 minutes
    await redis.set(
      `availability:${listenerId}`,
      JSON.stringify(availability),
      { EX: 300 }
    );

    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Availability fetch error"
    });
  }
};
