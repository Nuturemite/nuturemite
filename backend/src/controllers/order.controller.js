import { Order } from "../models/model";

export const addShippingAddress = async (req, res) => {
  try {
    const shippingDetials = req.body;
    const order = new Order({ userId: req.user._id }, { session: orderSession });
    order.shippingDetails = shippingDetials;
    order.save();
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderItems = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.items = req.body;
    order.save();
  } catch (error) {
    console.log(error);
  }
};

