import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: String,
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address"},
    createdAt: { type: Date, required: true ,default: Date.now},
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

