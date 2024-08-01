import { useCart } from "@/lib/data";
import React from "react";

export default function OrderSummary({}) {
  const { cartItems, isLoading, error } = useCart();

  if (isLoading) return;

  const totalPrice = cartItems?.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  const totalDiscount = cartItems?.reduce((total, cartItem) => {
    const itemDiscount =
      cartItem.quantity * (cartItem.product.basePrice - cartItem.product.price);
    return total + itemDiscount;
  }, 0);

  const deliveryCharges = totalPrice > 2000 ? 0 : 200;
  const totalAmount = totalPrice - totalDiscount + deliveryCharges;
  const totalItems = cartItems.length;
  const totalSave = totalDiscount + (deliveryCharges == 0 ? 200 : 0);

  return (
    <div>
      <section aria-labelledby="summary-heading" className=" bg-white lg:p-4 ">
        <h2
          id="summary-heading"
          className=" border-b border-gray-200 py-3 text-lg font-medium text-gray-900 "
        >
          Price Details
        </h2>
        <div>
          <dl className=" space-y-1 px-2 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-800">Price ({totalItems} item)</dt>
              <dd className="text-sm font-medium text-gray-900">₹ {totalPrice}</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="flex items-center text-sm text-gray-800">
                <span>Discount</span>
              </dt>
              <dd className="text-sm font-medium text-green-700">- ₹ {totalDiscount}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="flex text-sm text-gray-800">
                <span>Delivery Charges</span>
              </dt>
              <dd className="text-sm font-medium text-green-700">₹ {deliveryCharges || "Free"}</dd>
            </div>
            <div className="flex items-center justify-between border-y border-dashed py-4 ">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">₹ {totalAmount}</dd>
            </div>
          </dl>
          <div className="px-2 pb-4 font-medium text-green-700">
            You will save ₹ {totalSave} on this order
          </div>
        </div>
      </section>
    </div>
  );
}
