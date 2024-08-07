import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ShippingSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "SubOrder" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    // orderId: { type: String, required: true, unique: true },
    // shipId: { type: String, required: true, unique: true },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    trackingId: { type: String, required: true },
    carrier: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "picked",
        "shipped",
        "in-transit",
        "out-for-delivery",
        "delivered",
        "returned",
        "cancelled",
      ],
      default: "pending",
    },
    shippedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
  },
  { timestamps: true }
);
