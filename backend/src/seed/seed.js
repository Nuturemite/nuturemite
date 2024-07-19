import mongoose from "mongoose";
import { Product, VendorProduct } from "../models/model.js";
import { productData } from "./product.data.js";
import { vendorProductData } from "./vendorProduct.data.js";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nuturemite");
    console.log("Seeding...");
    await Product.deleteMany();
    await Product.insertMany(productData);
    await VendorProduct.deleteMany();
    await VendorProduct.insertMany(vendorProductData);
    console.log("Seeding done");
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
}
main();
