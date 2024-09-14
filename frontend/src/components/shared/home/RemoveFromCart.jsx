"use client";
import api from "@/lib/api";
import { useCart } from "@/lib/data";
import { tst } from "@/lib/utils";
import { useAuthContext } from "@/context/authprovider";
import { useCartContext } from "@/context/cartprovider";
export default function RemoveFromCart({ cartItem, pending, setPending }) {
  const { mutate } = useCart();
  const {isAuthenticated} = useAuthContext();
  const {removeFromCart} = useCartContext();
  async function handleCartRemove() {
    try {
      console.log("first");
      console.log(cartItem);
      setPending(true);
      if(isAuthenticated){
        await api.delete(`/cart/${cartItem.product._id}`);
        await mutate();
      }else{
        removeFromCart(cartItem.product);
      }
    } catch (error) {
      console.log(error);
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
