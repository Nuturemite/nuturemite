import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Address Schema
const AddressSchema = new Schema(
  {
    fname: String,
    lname: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  { _id: false }
);

// User Schema
const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: String,
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "vendor"], default: "user" },
    dateOfBirth: Date,
    mobile: String,
    gender: { type: String, enum: ["male", "female", "others"] },
    address: [AddressSchema],
  },
  { timestamps: true }
);

// Category Schema
const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

// Brand Schema
const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    basePrice: {
      type: Number,
      default: 0,
      set: v => parseFloat(parseFloat(v).toFixed(2)),
    },
    description: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", default: "66987df7c8d737564c027967" },
    sku: Number,
    barcode: String,
    image: String,
    images: [String],
    isSale: { type: Number, default: 0 },
    slug: String,
  },
  { timestamps: true }
);

// VendorProduct Schema
const VendorProductSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    price: {
      type: Number,
      default: 0,
      set: v => parseFloat(parseFloat(v).toFixed(2)),
    },
    inventory: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive", "out_of_stock"], default: "active" },
  },
  { timestamps: true }
);

// Order Schema
const OrderSchema = new Schema(
  {
    amount: { type: Number },
    deliveryFee: String,
    discount: String,
    total: String,
    paymentMode: { type: String, enum: ["COD", "ONLINE_PAYMENT"], required: true },
    paymentStatus: String,
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "picked",
        "onway",
        "delivered",
        "returned",
        "cancelled",
        "paused",
      ],
    },
    comment: String,
    shippingDetails: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      country: String,
      city: String,
      state: String,
      zipcode: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    paymentDetails: { type: Schema.Types.ObjectId, ref: "PaymentDetails" },
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Vendor Schema with embedded VendorDetails
const VendorSchema = new Schema(
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

// SubOrder Schema
const SubOrderSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    status: String,
    total: String,
    subOrderItems: [
      {
        quantity: { type: Number, required: true },
        price: { type: mongoose.Decimal128, required: true },
        subOrder: { type: Schema.Types.ObjectId, ref: "SubOrder", required: true },
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      },
    ],
  },
  { timestamps: true }
);

// PaymentDetails Schema
const PaymentDetailsSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    provider: String,
    status: String,
  },
  { timestamps: true }
);

// ApiToken Schema
const ApiTokenSchema = new Schema(
  {
    token: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// CartItem Schema
const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        vendorProduct: { type: Schema.Types.ObjectId, ref: "VendorProduct", required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// CartItem Schema
const WishlistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        vendorProduct: { type: Schema.Types.ObjectId, ref: "VendorProduct", required: true },
      },
    ],
  },
  { timestamps: true }
);

// Review Schema
const ReviewSchema = new Schema(
  {
    title: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Tag Schema
const TagSchema = new Schema({
  title: { type: String, required: true },
});

// City Schema
const CitySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    state: { type: Schema.Types.ObjectId, ref: "State", required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

// State Schema
const StateSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    cities: [{ type: Schema.Types.ObjectId, ref: "City" }],
  },
  { timestamps: true }
);

// Country Schema
const CountrySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    states: [{ type: Schema.Types.ObjectId, ref: "State" }],
  },
  { timestamps: true }
);

// Ucode Schema
const UcodeSchema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    dateExpired: Date,
  },
  { timestamps: true }
);


const vendorSchemaa = new mongoose.Schema({
  name: String,
  contactPerson: String,
  contactEmail: String,
  contactPhoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  businessInfo: {
    registrationNumber: String,
    taxId: String,
    businessType: String,
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    swiftCode: String,
  },
  status: {
    type: String,
    enum: ['profile', 'bank', 'business', 'complete'],
    default: 'profile',
  },
}, { timestamps: true });


// Compile all schemas
const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);
const Brand = mongoose.model("Brand", BrandSchema);
const Product = mongoose.model("Product", ProductSchema);
const VendorProduct = mongoose.model("VendorProduct", VendorProductSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Wishlist = mongoose.model("Wishlist", WishlistSchema);

const Address = mongoose.model("Address", AddressSchema);
const Order = mongoose.model("Order", OrderSchema);
const Vendor = mongoose.model("Vendor", VendorSchema);
const SubOrder = mongoose.model("SubOrder", SubOrderSchema);
const PaymentDetails = mongoose.model("PaymentDetails", PaymentDetailsSchema);
const ApiToken = mongoose.model("ApiToken", ApiTokenSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Tag = mongoose.model("Tag", TagSchema);
const City = mongoose.model("City", CitySchema);
const State = mongoose.model("State", StateSchema);
const Country = mongoose.model("Country", CountrySchema);

export {
  Category,
  Brand,
  Product,
  Order,
  Address,
  User,
  Vendor,
  SubOrder,
  PaymentDetails,
  ApiToken,
  Cart,
  Wishlist,
  Review,
  Tag,
  City,
  State,
  Country,
  VendorProduct,
};
