import { SubOrder, User, Review } from "../models/model.js";

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
    res.json({ data: revenuePerUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersAnalytics = async (req, res) => {
  try {
    const ordersAnalytics = await SubOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalOrders: 1,
        },
      },
    ]);
    ordersAnalytics.map((order) => {
      order.month = monthNames[order.month - 1];
    });
    res.json({ data: ordersAnalytics });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSalesAnalytics = async (req, res) => {
  try {
    const salesAnalytics = await SubOrder.aggregate([
      {
        $group: {
          _id: "$product",
          totalSales: { $sum: "$quantity" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          product: { $first: "$product" },
          totalSales: 1,
        },
      },
    ]);
    res.json({ data: salesAnalytics });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await SubOrder.aggregate([
      {
        $group: {
          _id: "$orderItems.product",
          totalSales: { $sum: "$orderItems.quantity" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          product: { $first: "$product" },
          totalSales: 1,
        },
      },
    ]);
    res.json({ data: topProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTopUsers = async (req, res) => {
  try {
    const topUsers = await SubOrder.aggregate([
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" }, 
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
          totalOrders: 1,
          totalRevenue: 1,
        },
      },
    ]);
    res.json({ data: topUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTodayReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("author", "name _id").limit(10);
    res.json({ data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];