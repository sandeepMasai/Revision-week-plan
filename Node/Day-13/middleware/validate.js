const ValidationError = require("../errors/ValidationError");

const validateRegister = (req, res, next) => {
  const { email, password, age } = req.body;
  const errors = [];

  // Email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Password validation
  if (!password || password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters",
    });
  }

  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push({
      field: "password",
      message: "Password must contain 1 uppercase letter & 1 number",
    });
  }

  // Age validation
  if (!age || age < 18) {
    errors.push({
      field: "age",
      message: "Age must be 18 or above",
    });
  }

  if (errors.length > 0) {
    return next(new ValidationError("Validation failed", errors));
  }

  next();
};

module.exports = validateRegister;
