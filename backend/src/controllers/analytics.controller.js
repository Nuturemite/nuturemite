import { SubOrder, User } from "../models/model.js";

export const getOrderAnalytics = async (req, res) => {
  try {
    const totalOrders = await SubOrder.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalPayments = await SubOrder.countDocuments({ paymentStatus: "paid" });
    const totalRevenue = await SubOrder.aggregate([
      {
        $match: { status: "delivered" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);
    console.log(totalOrders, totalUsers, totalRevenue, totalPayments);
    res.json({
      data: {
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.totalRevenue || 0,
        totalPayments,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRevenuePerUser = async (req, res) => {
  try {
    const revenuePerUser = await SubOrder.aggregate([
      {
        $group: {
          _id: "$user",
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          user: { $first: "$user" },
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
    ]);
    console.log(revenuePerUser);
    res.json({ data: revenuePerUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
