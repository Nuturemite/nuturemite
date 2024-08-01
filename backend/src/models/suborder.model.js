import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const SubOrderSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    subOrderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "placed", "confirmed", "picked", "onway", "delivered", "returned", "cancelled", "paused"],
      default: "pending",
    },
    createdAt: { type: Date, required: true },
    processedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
    cancelledAt: Date,
    pausedAt: Date,
  },
  { timestamps: true }
);
