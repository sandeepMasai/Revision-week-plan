const express = require("express");
const registerRoute = require("./route");
const errorHandler = require("./errorHandler");

const app = express();

app.use(express.json());

app.use("/api", registerRoute);

app.use(errorHandler);

app.listen(5000, () => console.log("Server running"));
