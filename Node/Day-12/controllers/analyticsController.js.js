import Order from "../models/Order.js";

export const getOrderAnalytics = async (req, res) => {
  try {
    const analytics = await Order.aggregate([
      // join users
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // join products
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // calculate order total
      {
        $addFields: {
          orderTotal: {
            $multiply: ["$quantity", "$product.price"],
          },
        },
      },

      // multiple analytics in one query
      {
        $facet: {
          salesByUser: [
            {
              $group: {
                _id: "$user._id",
                name: { $first: "$user.name" },
                totalSpent: { $sum: "$orderTotal" },
              },
            },
          ],

          salesByCategory: [
            {
              $group: {
                _id: "$product.category",
                totalSales: { $sum: "$orderTotal" },
              },
            },
          ],

          topCustomers: [
            {
              $group: {
                _id: "$user._id",
                name: { $first: "$user.name" },
                totalSpent: { $sum: "$orderTotal" },
              },
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
          ],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: analytics[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
