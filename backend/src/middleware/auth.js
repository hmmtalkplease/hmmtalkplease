import jwt from "jsonwebtoken";
import redis from "../config/redis.js";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 Redis session validation (Person-1 logic)
    const session = await redis.get(`session:${token}`);
    if (!session) {
      return res.status(401).json({ message: "Session expired" });
    }

    // Attach user info
    req.user = {
      id: decoded.id,
      role: decoded.role // ADMIN | LISTENER | USER
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
