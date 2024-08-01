import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Order Schema
export const OrderSchema = new Schema(
  {
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryFee: String,
    paymentMode: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "placed",
        "confirmed",
        "picked",
        "onway",
        "delivered",
        "returned",
        "cancelled",
        "paused",
      ],
      default: "pending",
    },
    comment: String,
    shippingDetails: {
      fname: String,
      lname: String,
      email: String,
      phone: String,
      address: String,
      street: String,
      country: String,
      city: String,
      state: String,
      zipcode: String,
    },
    createdAt: { type: Date, required: true },
    processedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
    cancelledAt: Date,
    pausedAt: Date,
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        basePrice: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
