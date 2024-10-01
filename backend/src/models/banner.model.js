import mongoose from "mongoose";

export const BannerSchema = new mongoose.Schema({
  title: { type: String},
  image: { type: String, required: true },
  active: { type: Boolean, default: true },
  category: { type: String, enum: ["home", "product", "blog", "about", "contact"], default: "home" },
  createdAt: { type: Date, default: Date.now },
});

