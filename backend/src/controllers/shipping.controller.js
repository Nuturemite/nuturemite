import { Shipping,SubOrder } from "../models/model.js";
import mongoose from "mongoose"
export const getAllMyShipmentsAsVendor = async (req, res) => {
  try {
    const response = await Shipping.find({ vendor: req.user.vendorId }).populate("shippingAddress");
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllShipments = async (req, res) => {
  try {
    const response = await Shipping.find().populate("shippingAddress");
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createShipment = async (req, res) => {
  try {
    const { orderId, trackingId, carrier } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await SubOrder.findById(orderId).select("_id shippingAddress").session(session);
      if (!order) {
        throw new Error("Order not found");
      }
      const shipment = new Shipping({
        order: order._id,
        shippingAddress: order.shippingAddress,
        trackingId: trackingId,
        carrier: carrier,
        vendor: req.user.vendorId,
      });
      await shipment.save({ session });
      await SubOrder.findOneAndUpdate(
        { _id: order._id },
        { status: "processing" },
        { session }
      );
      await session.commitTransaction();
      res.status(200).json({ message: "Shipment created successfully" });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackingId, carrier, status } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const shipment = await Shipping.findById(id).session(session);
      if (!shipment) {
        throw new Error("Shipment not found");
      }
      const updateObj = { trackingId, carrier };
      if (status) {
        updateObj.status = status;
        await SubOrder.findOneAndUpdate(
          { _id: shipment.order },
          { status },
          { session }
        );
      }
      await Shipping.findByIdAndUpdate(id, updateObj, { session });
      await session.commitTransaction();
      res.status(200).json({ message: "Shipment updated successfully" });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await Shipping.findById(id);
    if (!shipment) {
      throw new Error("Shipment not found");
    }
    res.status(200).json({data:shipment});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
