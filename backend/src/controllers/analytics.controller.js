import { SubOrder, User } from "../models/model.js";

export const getOrderAnalytics = async (req, res) => {
  const orderCount = await SubOrder.countDocuments();
  const userCount = await User.countDocuments();
  const totalRevenue = await SubOrder.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$total" },
      },
    },
  ]);
  const totalPayments = await SubOrder.aggregate([
    {
      $group: {
        _id: null,
        totalPayments: { $sum: "$total" },
      },
    },
  ]);
  try {
    res.json({ orderCount, userCount, totalRevenue, totalPayments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
