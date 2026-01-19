import prisma from "../prismaClient.js";

/**
 * GET /api/user/profile
 * Fetch logged-in user profile
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        age: true,
        language: true,
        category: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/user/profile
 * Update user profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { age, language, category } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        age,
        language,
        category
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/user/deactivate
 * Deactivate user account
 */
export const deactivateProfile = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { isActive: false }
    });

    res.json({ message: "Account deactivated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
