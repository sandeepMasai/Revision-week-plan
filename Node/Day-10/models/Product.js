import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
    },
    description: {
      type: String,
      text: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: String,
    stock: Number,
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
