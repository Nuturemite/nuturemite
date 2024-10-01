import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    desc: String,
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
