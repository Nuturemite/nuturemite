"use client"
import { useCart ,useSettings} from "@/lib/data";
import React from "react";
import { useAuthContext } from "@/context/authprovider";
import { useCartContext } from "@/context/cartprovider";
export default function OrderSummary({}) {
  const {isAuthenticated} = useAuthContext();
  const { cartItems: onlineCart, isLoading, error } = useCart(isAuthenticated);
  const { cart: localCart } = useCartContext();
  const cartItems = isAuthenticated ? onlineCart : localCart;
  const {settings} = useSettings();
  const FREE_SHIPPING_THRESHOLD = settings?.freeShippingThreshold || 0;
  const SHIPPING_CHARGES = settings?.shippingCharges || 0;

  if (isLoading) return;

  const totalMrp = cartItems?.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.mrp;
  }, 0);

 const totalDiscount = cartItems?.reduce((total, cartItem) => {
    const itemDiscount =
      cartItem.quantity * (cartItem.product.mrp - cartItem.product.price);
    return total + itemDiscount;
  }, 0);

  const totalPrice = cartItems?.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  const deliveryCharges = totalPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGES;
  const totalAmount = totalMrp - totalDiscount + deliveryCharges;
  const totalItems = cartItems.length;
  const totalSave = totalDiscount + (deliveryCharges == 0 ? FREE_SHIPPING_THRESHOLD : 0);

  return (
    <div>
      <section aria-labelledby="summary-heading" className=" bg-white p-4 ">
        <h2
          id="summary-heading"
          className=" border-b border-gray-200 py-3 text-lg font-medium text-gray-900 "
        >
          Price Details
        </h2>
        <div>
          <dl className=" space-y-1 px-2 py-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-800">Total MRP ({totalItems} item)</dt>
              <dd className="text-sm font-medium text-gray-900">₹ {totalMrp}</dd>
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
