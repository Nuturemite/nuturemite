import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const PaymentSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    paymentMode: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  },
  { timestamps: true }
);