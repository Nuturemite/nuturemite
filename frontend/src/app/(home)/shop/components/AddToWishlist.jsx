"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import React, { useState } from "react";
import { useWishlist } from "@/lib/data";

function AddToWishlist({ product, isChild, children }) {
  const {mutate} = useWishlist();
  const [pending, setPending] = useState(false);

  async function handleWishlistAdd(e) {
    e.preventDefault();
    try {
      setPending(true);
      console.log(product._id)
      await api.post(`/wishlist/${product._id}`);
      await mutate();
      tst.success("Wishlist item added");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  }

  if (isChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleWishlistAdd });
  }
  return (
    <Button variant="outline" pending={pending} onClick={handleWishlistAdd} size="lg">
      Add to Wishlist
    </Button>
  );
}

export default AddToWishlist;
