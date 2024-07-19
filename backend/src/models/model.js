import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Address Schema
const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  { _id: false }
);

// Profile Schema
const ProfileSchema = new Schema(
  {
    dateOfBirth: Date,
    mobile: String,
    gender: { type: String, enum: ["male", "female", "others"] },
    address: [AddressSchema],
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
    profile: ProfileSchema,
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
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true, }],
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
    amount: { type: mongoose.Decimal128 },
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
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    paymentDetails: { type: Schema.Types.ObjectId, ref: "PaymentDetails" },
    subOrders: [{ type: Schema.Types.ObjectId, ref: "SubOrder" }],
    orderItems: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
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

// SubOrderItem Schema
const SubOrderItemSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    price: { type: mongoose.Decimal128, required: true },
    subOrder: { type: Schema.Types.ObjectId, ref: "SubOrder", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
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
    subOrderItems: [{ type: Schema.Types.ObjectId, ref: "SubOrderItem" }],
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
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

const bookSchema = mongoose.Schema({
  _id: Number,
  name: String,
  author: String,
  pages: Number,
});

// Compile all schemas
const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model("Profile", ProfileSchema);
const Category = mongoose.model("Category", CategorySchema);
const Brand = mongoose.model("Brand", BrandSchema);
const Product = mongoose.model("Product", ProductSchema);
const VendorProduct = mongoose.model("VendorProduct", VendorProductSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Wishlist = mongoose.model("Wishlist", WishlistSchema);

const Address = mongoose.model("Address", AddressSchema);
const Order = mongoose.model("Order", OrderSchema);
const Vendor = mongoose.model("Vendor", VendorSchema);
const SubOrderItem = mongoose.model("SubOrderItem", SubOrderItemSchema);
const SubOrder = mongoose.model("SubOrder", SubOrderSchema);
const PaymentDetails = mongoose.model("PaymentDetails", PaymentDetailsSchema);
const ApiToken = mongoose.model("ApiToken", ApiTokenSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Tag = mongoose.model("Tag", TagSchema);
const City = mongoose.model("City", CitySchema);
const State = mongoose.model("State", StateSchema);
const Country = mongoose.model("Country", CountrySchema);
const Book = mongoose.model("Book", bookSchema);

export {
  Category,
  Brand,
  Product,
  Order,
  Address,
  Profile,
  User,
  Vendor,
  SubOrderItem,
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
