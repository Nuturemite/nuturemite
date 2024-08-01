import mongoose from "mongoose";

import { CartSchema } from "./cart.model.js";
import { CategorySchema } from "./category.model.js";
import { BrandSchema } from "./brand.model.js";
import { ProductSchema } from "./product.model.js";
import { OrderSchema } from "./order.model.js";
import { ReviewSchema } from "./review.model.js";
import { VendorSchema } from "./vendor.model.js";
import { WishlistSchema } from "./wishlist.model.js";
import { UserSchema } from "./user.model.js";
import { SubOrderSchema } from "./suborder.model.js";

export const User = mongoose.model("User", UserSchema);
export const Category = mongoose.model("Category", CategorySchema);
export const Brand = mongoose.model("Brand", BrandSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Cart = mongoose.model("Cart", CartSchema);
export const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export const Order = mongoose.model("Order", OrderSchema);
export const SubOrder = mongoose.model("SubOrder", SubOrderSchema);
export const Vendor = mongoose.model("Vendor", VendorSchema);
export const Review = mongoose.model("Review", ReviewSchema);


// const vendorSchema = new mongoose.Schema(
//   {
//     name: String,
//     contactPerson: String,
//     contactEmail: String,
//     contactPhoneNumber: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       postalCode: String,
//       country: String,
//     },
//     businessInfo: {
//       registrationNumber: String,
//       taxId: String,
//       businessType: String,
//     },
//     bankDetails: {
//       bankName: String,
//       accountNumber: String,
//       routingNumber: String,
//       swiftCode: String,
//     },
//     status: {
//       type: String,
//       enum: ["profile", "bank", "business", "complete"],
//       default: "profile",
//     },
//   },
//   { timestamps: true }
// );
