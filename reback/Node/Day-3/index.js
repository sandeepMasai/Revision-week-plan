const express = require("express");
const app = express();
const PORT = 2000;
const router = require("./routes/authRoute");

app.get("/api/auth", router);

app.use("/", (req, res) => {
  res.send("app is running");
});

app.listen(PORT, () => {
  console.log(`app server is running Port ${PORT}`);
});
