import { Order } from "../models/model";
import { findCartByUserId } from "./cart.controller";

export const addShippingAddress = async (req, res) => {
  try {
    const shippingDetials = req.body;
    const order = new Order(
      { userId: req.user._id, orderId: req.params.id },
    );
    order.shippingDetails = shippingDetials;
    order.save();
  } catch (error) {
    console.log(error);
  }
};

export const addOrderItems = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id },);
    const cart = findCartByUserId(req.user.id);
    const orderItems = cart.map(cartItem => {
      ({
        productId: vendorProduct._id,
        baseProductId: product._id,
        price: vendorProduct.price,
        basePrice: product.basePrice,
        quantity: cartItem.quantity,
      });
    });
    cart.items = []
    cart.save();
    order.items = orderItems;
    order.save();
  } catch (error) {
    console.log(error);
  }
};
