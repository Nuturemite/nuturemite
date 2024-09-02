import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const RefundSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subOrder: { type: Schema.Types.ObjectId, ref: "SubOrder", required: true },
    reason: { type: String, required: true },
    refundAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processed", "cancelled"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    processedAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

RefundSchema.pre("find", function () {
  this.sort({ createdAt: -1 });
});

