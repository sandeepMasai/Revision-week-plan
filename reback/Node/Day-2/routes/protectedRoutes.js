const express = require("express");
const cookieAuth = require("../middleware/cookieAuth");

const router = express.Router();

router.get("/protected", cookieAuth, (req, res) => {
  res.send({ message: "Admin access", user: req.user });
});

module.exports = router;
