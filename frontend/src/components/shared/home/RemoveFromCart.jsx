"use client";
import api from "@/lib/api";
import { useCart } from "@/lib/data";
import { tst } from "@/lib/utils";

export default function RemoveFromCart({ cartItem, pending, setPending }) {
  const { mutate } = useCart();

  async function handleCartRemove() {
    try {
      setPending(true);
      await api.delete(`/cart/${cartItem.vendorProduct._id}`);
      await mutate();
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
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
