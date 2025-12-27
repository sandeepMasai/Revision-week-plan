const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("App Run Successful");
});

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Start Port ${PORT} `);
});
