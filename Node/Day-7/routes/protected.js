const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to protected dashboard",
  });
});

router.get("/crash", (req, res, next) => {
  // Simulate error
  const err = new Error("Something went wrong!");
  err.status = 500;
  next(err);
});

module.exports = router;
