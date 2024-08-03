// const mongoose = require("mongoose");
import mongoose from "mongoose"
const Schema = mongoose.Schema
// Address Schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

// Bank Account Schema
const bankAccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  branchCode: { type: String, required: true },
});

// Business License Schema
const businessLicenseSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true },
  issuedBy: { type: String, required: true },
  issuedDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  documentUrl: { type: String, required: true }, // URL to the uploaded license document
});

// Store Schema
const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  logoUrl: { type: String, required: true }, // URL to the uploaded store logo
  bannerUrl: { type: String, required: true }, // URL to the uploaded store banner
  description: { type: String, required: true },
  returnPolicy: { type: String, required: true },
  shippingMethods: [String],
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
});

// Vendor Schema
export const VendorSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  taxId: { type: String, required: true },
  address: { type: addressSchema, required: true },
  bankAccount: { type: bankAccountSchema, required: true },
  businessLicense: { type: businessLicenseSchema, required: true },
  store: { type: storeSchema, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  detailsStatus: { type: String, enum: ['register','business','bank','profile','complete'], default: "register" },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
