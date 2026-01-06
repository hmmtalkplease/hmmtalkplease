import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import redis from "../config/redis.js";

/* ================= USER AUTH ================= */

/**
 * POST /api/auth/user/register
 */
export const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed }
    });

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/user/login
 */
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ JWT CONTAINS ROLE
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role // USER / ADMIN
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await redis.set(`session:${token}`, "1", { EX: 86400 });

    res.json({
      token,
      role: user.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LISTENER AUTH ================= */

/**
 * POST /api/auth/listener/register
 */
export const listenerRegister = async (req, res) => {
  try {
    const { email, password, qualifications, certifications } = req.body;

    const exists = await prisma.listener.findUnique({ where: { email } });
    if (exists)
      return res.status(400).json({ message: "Listener already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.listener.create({
      data: {
        email,
        password: hashed,
        qualifications,
        certifications,
        approved: false
      }
    });

    res.status(201).json({
      message: "Listener registered. Await admin approval."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/listener/login
 */
export const listenerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const listener = await prisma.listener.findUnique({ where: { email } });
    if (!listener)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!listener.approved)
      return res.status(403).json({ message: "Listener not approved" });

    const valid = await bcrypt.compare(password, listener.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ JWT CONTAINS LISTENER ROLE
    const token = jwt.sign(
      {
        id: listener.id,
        role: "LISTENER"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await redis.set(`session:${token}`, "1", { EX: 86400 });

    res.json({
      token,
      role: "LISTENER"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */

/**
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await redis.del(`session:${token}`);

    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
