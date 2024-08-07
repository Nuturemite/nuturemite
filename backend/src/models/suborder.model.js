import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const SubOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    // orderId: { type: String, required: true, unique: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    orderItems: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number,
      },
    ],
    subTotal: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    disTotal: { type: Number, default: 0 },
    delCharges: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "in-transit",
        "out-for-delivery",
        "delivered",
        "returned",
        "cancelled",
      ],
      default: "pending",
    },
    createdAt: { type: Date, required: true },
    processedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
    cancelledAt: Date,
    pausedAt: Date,
  },
  { timestamps: true }
);


SubOrderSchema.pre("find", function () {
  this.sort({ _id: -1 });
});

SubOrderSchema.pre("findOne", function () {
  this.sort({ _id: -1 });
});


export const SubOrder = mongoose.model("SubOrder", SubOrderSchema);
