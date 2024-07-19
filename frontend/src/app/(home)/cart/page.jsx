"use client";
import { useCart } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/common/error";
import RemoveFromCart from "@/components/shared/home/RemoveFromCart";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { useState } from "react";
import { tst } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import OrderSummary from "./OrderSummary";

const ShoppingCart = () => {
  const { cartItems, isLoading, error, mutate } = useCart();
  console.log(cartItems);
  const [pending, setPending] = useState(false);
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const handleQuantityChange = async (item, value) => {
    try {
      setPending(true);
      await api.post(`/cart/${item.vendorProduct._id}`, { quantity: value });
      mutate();
      setPending(false);
      tst.success("Quantity updated successfully");
    } catch (error) {
      tst.error(error);
      setPending(false);
      console.log(error);
    }
  };

  console.log('first')

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-6xl mt-10 mx-auto">
      <h2 className="h2-primary">Shopping cart</h2>

      <div className="mt-16 flex  gap-16 ">
        {/* Cart */}
        <div className={`w-3/5 ${pending && "opacity-80 pointer-events-none"}`}>
          <ul role="list" className="-my-6 divide-y-4 divide-gray-200">
            {cartItems.map(cartItem => (
              <li key={cartItem._id} className="flex p-4 bg-white ">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden  border border-gray-200">
                  <img
                    src={cartItem.product?.images[1] || "/test1.png"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{cartItem.product.name}</h3>
                      <div>
                        <p className="ml-4">{cartItem.product.price}</p>
                        {/* <p className="ml-4">{cartItem.product.discount}</p> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="py-2">
                      <Select
                        disabled={pending}
                        className="w-full"
                        value={cartItem.quantity}
                        onValueChange={value => handleQuantityChange(cartItem, value)}
                      >
                        <SelectTrigger className="w-16 h-8 border-slate-600  focus:ring-0">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
                            <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {cartItem.quantity}</p>
                    <div className="flex">
                      <RemoveFromCart cartItem={cartItem}  />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="w-2/5">
          <OrderSummary />

          {/* Checkout */}
          <div className="space-y-2 border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6">
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link
                  href="/shop"
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <p className="text-gray-500">No items in cart</p>
    <div className="mt-4">
      <Button href="/products" variant="outline">
        Start Shopping
      </Button>
    </div>
  </div>
);

export default ShoppingCart;
