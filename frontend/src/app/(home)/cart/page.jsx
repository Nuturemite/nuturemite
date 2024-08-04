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
import { useState, useEffect } from "react";
import { tst } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import OrderSummary from "./OrderSummary";
import { useAuthContext } from "@/context/authprovider";

const ShoppingCart = () => {
  const { cartItems, isLoading, error, mutate } = useCart();
  const [pending, setPending] = useState(false);
  const { isAuthenticated } = useAuthContext();


  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (error) return <Error />;
  if (cartItems.length === 0) return <EmptyCart />;

  const isCheckoutDisabled = cartItems.some(cartItem => cartItem.quantity > cartItem.product.quantity);

  const handleQuantityChange = async (cartItem, value) => {
    try {
      setPending(true);
      await api.post(`/cart/`, { productId: cartItem.product._id, quantity: value });
      await mutate();
      tst.success("Quantity updated successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={` ${pending && "opacity-50 pointer-events-none"}`}>
      <div className="max-w-6xl mt-10 mx-auto">
        <h2 className="h2-primary">Shopping cart</h2>

        <div className="mt-10 flex gap-16">
          {/* Cart */}
          <ul role="list" className="divide-y-4 divide-gray-200 w-3/5">
            {cartItems.map(cartItem => (
              <li key={cartItem._id} className="flex p-4 bg-white">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
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
                        <span className="ml-6"> &#8377;{cartItem.product.price}</span>
                        <span className="ml-2 line-through text-sm text-red-600">
                          {" "}
                          &#8377;{cartItem.product.basePrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="py-2">
                      {cartItem.product.quantity > 0 ? (
                        <Select
                          disabled={pending}
                          className="w-full"
                          value={cartItem.quantity}
                          onValueChange={value => handleQuantityChange(cartItem, value)}
                        >
                          <SelectTrigger className="w-16 h-8 border-slate-600 focus:ring-0">
                            <SelectValue placeholder="1" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: Math.min(100, cartItem.product.quantity) }, (_, i) => i + 1).map(i => (
                              <SelectItem key={i} value={i}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-red-600">Out of Stock</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {cartItem.quantity}</p>
                    <div className="flex">
                      <RemoveFromCart
                        cartItem={cartItem}
                        pending={pending}
                        setPending={setPending}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Order Summary */}
          <div className="w-2/5">
            <OrderSummary />
            {/* Checkout */}
            <Checkout isDisabled={isCheckoutDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-screen">
    <p className="text-gray-500">No items in cart</p>
    <div className="mt-4">
      <Link href="/shop">
        <Button variant="outline">Start Shopping</Button>
      </Link>
    </div>
  </div>
);

const NotAuthenticated = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-screen">
    <p className="text-gray-500">Please login to continue</p>
    <div className="mt-4">
      <Link href="/auth/signin">
        <Button variant="outline">Login</Button>
      </Link>
    </div>
  </div>
);

const Checkout = ({ isDisabled }) => {
  return (
    <div className="space-y-2 border-gray-200 px-4 py-6 sm:px-6">
      <div className="mt-6">
        <Link href="/checkout">
          <Button className="w-full" disabled={isDisabled}>
            {"Checkout"}
          </Button>
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
  );
};

export default ShoppingCart;
