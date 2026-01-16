const express = require("express");
const validateRegister = require("../middleware/validate");

const router = express.Router();

router.post("/register", validateRegister, (req, res) => {
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: req.body,
  });
});

module.exports = router;
