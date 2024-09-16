"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import React, { useState } from "react";
import { useAuthContext } from "@/context/authprovider";
import { useCartContext } from "@/context/cartprovider";
import { useCart } from "@/lib/data";

function AddToCart({ product, setPending, isChild, children, quantity }) {
  const { isAuthenticated } = useAuthContext();
  const { addToCart } = useCartContext();
  const { mutate } = useCart();

  async function handleCartAdd(e) {
    e.preventDefault();
    try {
      setPending(true);
      if (isAuthenticated) {
        await api.post(`/cart`, { productId: product._id, quantity: quantity || 1 });
        await mutate();
        tst.success("Cart item added");
      } else {
        addToCart(product);
        tst.success("Cart item added");
      }
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  }

  if (isChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleCartAdd });
  }
  return (
    <Button onClick={handleCartAdd} size="lg">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
