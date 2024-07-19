"use client";
import api from "@/lib/api";
import { useCart } from "@/lib/data";
import { tst } from "@/lib/utils";

export default function RemoveFromCart({ cartItem }) {
  const { mutate } = useCart();

  async function handleCartRemove() {
    try {
      await api.delete(`/cart/${cartItem.vendorProduct._id}`);
      mutate();
    } catch (error) {
      tst.error(error);
    }
  }

  return (
    <button
      onClick={handleCartRemove}
      type="button"
      className="font-medium text-indigo-600 hover:text-indigo-500"
    >
      Remove
    </button>
  );
}
