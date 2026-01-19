const validate = (validations) => {
  return (req, res, next) => {
    const errors = [];

    validations.forEach((validation) => {
      const error = validation(req);
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation Error",
        details: errors
      });
    }

    next();
  };
};

const isMongoId = (field, location = "params") => (req) => {
  const value = req[location][field];
  const mongoIdRegex = /^[a-f\d]{24}$/i;
  
  if (!value || !mongoIdRegex.test(value)) {
    return `Invalid ${field} format`;
  }
  return null;
};

const isRequired = (field, location = "body") => (req) => {
  const value = req[location][field];
  
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${field} is required`;
  }
  return null;
};

const isLength = (field, min, max, location = "body") => (req) => {
  const value = req[location][field];
  
  if (value && value.length < min) {
    return `${field} must be at least ${min} characters`;
  }
  
  if (value && value.length > max) {
    return `${field} must be at most ${max} characters`;
  }
  
  return null;
};

const isIn = (field, values, location = "body") => (req) => {
  const value = req[location][field];
  
  if (value && !values.includes(value)) {
    return `${field} must be one of: ${values.join(", ")}`;
  }
  return null;
};

export const reportValidation = {
  createReport: validate([
    isMongoId("id", "params"),
    isRequired("reason"),
    isLength("reason", 10, 500)
  ]),
  
  updateReportStatus: validate([
    isMongoId("id", "params"),
    isRequired("status"),
    isIn("status", ["PENDING", "REVIEWED", "RESOLVED"])
  ])
};

export const supportValidation = {
  createTicket: validate([
    isRequired("subject"),
    isLength("subject", 5, 200)
  ]),
  
  updateTicket: validate([
    isMongoId("id", "params"),
    isRequired("status"),
    isIn("status", ["OPEN", "IN_PROGRESS", "CLOSED"])
  ])
};