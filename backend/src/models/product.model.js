import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    description: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", default: "66987df7c8d737564c027967" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    quantity: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
    sku: String,
    images: [String],
    shippingDetails: {
      weight: { type: Number },
      dimensions: { length: Number, width: Number, height: Number },
    },
    stockLimit: { type: Number, default: 0 },
    details: [{ name: String, value: String }],
    apvStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejRmk: String,
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("discount").get(function () {
  return this.mrp - this.price;
});

ProductSchema.virtual("discountPercent").get(function () {
  return Math.round(((this.mrp - this.price) / this.mrp) * 100);
});

ProductSchema.pre('find', function(next){
  this.sort({_id: -1});
  next();
})
