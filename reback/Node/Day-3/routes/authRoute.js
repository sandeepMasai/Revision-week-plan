const express = require("express");
const { register, login, profile } = require("../controller/authController");
const { Auth } = require("../middleware/auth.Middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", Auth, profile);

module.exports = router;
