import { Review } from "../models/model.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    req.body.author = userId;
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({ message: "Review created successfully!", data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const productId = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("author", "name _id")
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Review.countDocuments({ product: productId });
    res.status(200).json({
      message: "Reviews fetched successfully!",
      data: reviews,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

