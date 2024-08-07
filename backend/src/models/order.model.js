import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Order Schema
export const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryFee: String,
    paymentMode: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
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
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    createdAt: { type: Date, required: true },
    processedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
    cancelledAt: Date,
    pausedAt: Date,
  },
  { timestamps: true }
);

OrderSchema.pre("find", function () {
  this.sort({ _id: -1 });
});

OrderSchema.pre("findOne", function () {
  this.sort({ _id: -1 });
});

OrderSchema.virtual("suborders", {
  ref: "SubOrder",
  localField: "_id",
  foreignField: "order",
});
