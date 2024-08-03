import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    price: { type: Number, required: true },
    description: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", default: "66987df7c8d737564c027967" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    quantity: { type: Number, default: 0 },
    sku: String,
    images: [String],
    shippingDetails: {
      weight: { type: Number, required: true },
      dimensions: { type: String, required: true },
    },
    weight: { type: Number },
    details: [
      {
        name: String,
        value: String,
      },
    ],
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
