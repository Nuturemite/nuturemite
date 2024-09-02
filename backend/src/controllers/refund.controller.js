import { Refund } from "../models/model.js";
import { SubOrder } from "../models/model.js";
import mongoose from "mongoose"
export const createRefund = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { reason, refundAmount } = req.body;
    const orderId = req.params.orderId;
    const user = req.user.id;
    const vendor = req.user.vendorId;

    const refund = new Refund({
      user,
      vendor,
      subOrder: orderId,
      reason,
      refundAmount,
    });
    await SubOrder.findByIdAndUpdate(orderId, { paymentStatus: "refunded" }, { session });
    await refund.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: "Refund request created" });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
export const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find({ user: req.user.id }).populate("user", "name email");
    res.status(200).json({ data: refunds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyVendorRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find({ vendor: req.user.vendorId }).populate("user", "name email");
    res.status(200).json({ data: refunds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}