import mongoose from "mongoose";
import { Product, VendorProduct } from "../models/model.js";
import { vendorProductData } from "./data/vendorProduct.js";
import { productData } from "./data/product.js";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nuturemite");
    console.log("Seeding...");
    await Product.deleteMany();
    await VendorProduct.deleteMany();
    await Product.insertMany(productData);
    await VendorProduct.insertMany(vendorProductData);
    console.log("Seeding done");
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
}
main();
