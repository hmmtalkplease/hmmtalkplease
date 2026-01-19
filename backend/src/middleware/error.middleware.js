/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: "Validation Error",
      details: errors
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format"
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired"
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

/**
 * 404 Not Found handler
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};