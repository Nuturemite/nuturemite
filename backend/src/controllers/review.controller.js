import { Review } from "../models/model.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    req.body.author = req.user.id;
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({ message: "Review created successfully!", data: review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate(
      "author",
      "name _id"
    );
    res.status(200).json({
      message: "Reviews fetched successfully!",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

