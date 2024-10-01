import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Address Schema
const addressSchema = new mongoose.Schema(
  {
    warehouseName: { type: String },
    warehouseAddress: { type: String },
    contactName: { type: String },
    contactPhone: { type: String },
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { index: false }
);

// Bank Account Schema
const bankAccountSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    branchCode: { type: String, required: true },
  },
  { index: false }
);

// Business License Schema
const businessLicenseSchema = new mongoose.Schema(
  {
    licenseNumber: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    documentUrl: { type: String },
  },
  { index: false }
);

// Store Schema
const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String },
    logoUrl: { type: String },
    bannerUrl: { type: String },
    description: { type: String },
    returnPolicy: { type: String },
    shippingMethods: [String],
    socialMediaLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
    },
  },
  { index: false }
);

// Vendor Schema
export const VendorSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  gstin: { type: String },
  address: { type: addressSchema },
  bankAccount: { type: bankAccountSchema },
  businessLicense: { type: businessLicenseSchema },
  store: { type: storeSchema },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  apvStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User" },

  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
