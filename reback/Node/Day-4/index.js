const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({ message: "API working fine " });
});

app.get("/test", (req, res) => {
  res.json({ message: "Rate limit test successful" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
