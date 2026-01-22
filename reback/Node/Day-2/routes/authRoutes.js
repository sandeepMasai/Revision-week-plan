const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secretKey = "json_secretKey";

// LOGIN
router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  // create JWT
  const token = jwt.sign({ username }, secretKey, {
    expiresIn: "1d",
  });

  // store token in cookie
  res.cookie("authUser", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.json({ message: "Login successful" });
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("authUser");
  res.json({ message: "User logout successful" });
});

module.exports = router;
