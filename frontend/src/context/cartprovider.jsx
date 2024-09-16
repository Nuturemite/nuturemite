"use client";
import { createContext, useState, useContext, useEffect } from "react";
import api from "@/lib/api";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find((item) => item.product._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id ? { ...item, quantity:  quantity } : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const changeQuantity = (product, quantity) => {
    setCart(
      cart.map((item) =>
        item.product._id === product._id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.product._id !== product._id));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, changeQuantity, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };

export const useCartContext = () => useContext(CartContext);

