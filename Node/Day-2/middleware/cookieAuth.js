const jwt = require("jsonwebtoken");
const secretKey = "json_secretKey";

const cookieAuth = (req, res, next) => {
  const token = req.cookies.authUser;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = cookieAuth;
