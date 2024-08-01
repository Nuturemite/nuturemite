import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);
