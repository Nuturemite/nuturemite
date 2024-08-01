import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ReviewSchema = new Schema(
  {
    title: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
