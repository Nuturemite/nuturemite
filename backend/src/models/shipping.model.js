import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ShippingSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "SubOrder" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    orderId: { type: String, required: true },
    shipmentId: { type: String, required: true },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    trackingId: { type: String, },
    carrier: { type: String },
    label: { type: String },
    trackingUrl: { type: String },
    
    status: {
      type: String,
      enum: [
        "pending",
        "picked",
        "booked",
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
