export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      console.log(
        `Access denied: role=${req.user?.role}, required=${requiredRole}`
      );
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    next();
  };
};

// ✅ Backward compatibility
export const isAdmin = requireRole("ADMIN");
export const isListener = requireRole("LISTENER");
export const isUser = requireRole("USER");
