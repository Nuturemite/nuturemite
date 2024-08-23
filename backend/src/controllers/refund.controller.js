import { Refund } from "../models/model.js";

export const createRefund = async (req, res) => {
  try {
    const { reason, refundAmount } = req.body;
    const orderId = req.params.orderId;
    const user = req.user.id;

    const refund = new Refund({
      user,
      subOrder: orderId,
      reason,
      refundAmount,
    });

    await refund.save();

    res.status(201).json({ message: "Refund request created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
