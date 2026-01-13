import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = { $in: category.split(",") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (inStock !== undefined) {
      query.inStock = inStock === "true";
    }

    const sortOptions = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      results: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
