import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const VendorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    domain: String,
    status: {
      type: String,
      enum: ["pending", "approved", "banned", "disabled"],
      default: "pending",
    },
    active: { type: Boolean, default: true },
    vendorDetails: {
      displayName: String,
      name: String,
      phone: String,
      email: String,
      description: String,
      logo: String,
      vendorUrl: { type: Schema.Types.ObjectId, ref: "VendorUrl" },
      address: { type: Schema.Types.ObjectId, ref: "Address" },
    },
  },
  { timestamps: true }
);

// CartItem Schema
const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
