import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      index: true,
    },
    category: {
      type: String,
      index: true,
    },
    price: {
      type: Number,
      index: true,
    },
    rating: {
      type: Number,
      index: true,
    },
    inStock: {
      type: Boolean,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

productSchema.index({ category: 1, price: 1 });

export default mongoose.model("Product", productSchema);
