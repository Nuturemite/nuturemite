import mongoose from "mongoose";
const Schema = mongoose.Schema;
import axios from "axios";
// Order Schema
export const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: String,
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryFee: String,
    paymentMode: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "placed",
        "confirmed",
        "picked",
        "onway",
        "delivered",
        "returned",
        "cancelled",
        "paused",
      ],
      default: "pending",
    },
    comment: String,
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    createdAt: { type: Date, required: true },
    processedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
    cancelledAt: Date,
    pausedAt: Date,
  },
  { timestamps: true }
);

OrderSchema.pre("find", function () {
  this.sort({ _id: -1 });
});

OrderSchema.pre("findOne", function () {
  this.sort({ _id: -1 });
});

OrderSchema.virtual("suborders", {
  ref: "SubOrder",
  localField: "_id",
  foreignField: "order",
});

const createShippingOrder = async (order, shippingOrder, session) => {
  const data = {
    order_number: order._id,
    unique_order_number: yes,
    shipping_charges: 40,
    discount: order.discount,
    cod_charges: 30,
    payment_type: "cod",
    order_amount: 2400,
    package_weight: 300,
    package_length: 10,
    package_breadth: 10,
    package_height: 10,
    request_auto_pickup: "yes",
    consignee: {
      name: "Customer Name",
      address: "190, ABC Road",
      address_2: "Near Bus Stand",
      city: "Mumbai",
      state: "Maharastra",
      pincode: "251001",
      phone: "9999999999"
    },
    pickup: {
      warehouse_name: "warehouse 1",
      name: "Nitish Kumar (Xpressbees Private Limited)",
      address: "140, MG Road",
      address_2: "Near metro station",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "251001",
      phone: "9999999999"
    },
    order_items: [
      {
        name: "product 1",
        qty: "18",
        price: "100",
        sku: "sku001"
      }
    ],
    courier_id: "",
    collectable_amount: "1500"
  };
  
  // const response = await axios.post("/https://shipment.xpressbees.com/api/shipments2".data);
};
