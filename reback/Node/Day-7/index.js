const express = require("express");
const logger = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const timer = require("./middlewares/timer");
const errorHandler = require("./middlewares/errorHandler");
const protectedRoutes = require("./routes/protected");

const app = express();
const PORT = 3000;

app.use(express.json());

//  Apply middleware chain ONLY to protected routes
app.use("/api", logger, auth, timer, protectedRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
