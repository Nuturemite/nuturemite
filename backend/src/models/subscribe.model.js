import mongoose from "mongoose";

export const SubscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

