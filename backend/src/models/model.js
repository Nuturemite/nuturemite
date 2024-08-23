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
import { AddressSchema } from "./address.model.js";
import { ShippingSchema } from "./shipping.model.js";
import {RefundSchema} from "./refund.model.js";

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
export const Address = mongoose.model("Address", AddressSchema);
export const Shipping = mongoose.model("Shipping", ShippingSchema);
export const Refund = mongoose.model("Refund", RefundSchema);
