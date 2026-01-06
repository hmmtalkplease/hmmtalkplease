import jwt from "jsonwebtoken";

const auth = (requiredRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(decoded.role)
      ) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default auth;