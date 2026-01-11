import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
