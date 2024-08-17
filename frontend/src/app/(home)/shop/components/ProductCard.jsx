import React from "react";
import { ShoppingCart, Heart, Search } from "lucide-react";
import AddToWishlist from "./AddToWishlist";
import Link from "next/link";
import { tst } from "@/lib/utils";
import api from "@/lib/api";

export const ProductCard = ({ product, featured }) => {
  const { _id, images, name, basePrice, price, quantity } = product;
  async function handleCartAdd(e, product) {
    e.preventDefault();
    try {
      await api.post(`/cart`, { productId: product._id, quantity: 1 });
      tst.success("Cart item added");
    } catch (error) {
      tst.error(error);
    } finally {
    }
  }

  return (
    <Link href={`/shop/${_id}`}>
      <div className="w-full h-full group hover:shadow-md cursor-pointer bg-white p-2 relative">
        {/* Product Image and Sold Out Badge */}
        <div className="relative bg-white mb-4 overflow-hidden">
          <img
            className={`w-full ${
              featured && "max-h-44"
            } aspect-auto object-cover p-2 group-hover:scale-110 group-hover:brightness-50 transition duration-500`}
            src={images?.length ? images[1] : "./noimage.png"}
            alt={name}
          />

          {/* <div className="absolute top-2 left-2 bg-red-700 rounded-full text-xs text-white h-12 w-12 flex justify-center items-center">
            {product.discountPercent} % off
          </div> */}
          {/* Sold Out Badge */}
          {quantity === 0  && !featured ? (
            <div className="absolute z-10 top-1/2 text-center -rotate-45 w-full bg-black bg-opacity-50 text-white  font-bold">
              Out of Stock
            </div>
          ) : (
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 group-hover:flex space-x-6 hidden">
              <div onClick={e => handleCartAdd(e, product)} className="p-1 border border-tert-100">
                <ShoppingCart className="text-tert-100" />
              </div>
              <AddToWishlist product={product} isChild>
                <div className="p-1 border border-tert-100">
                  <Heart className="text-tert-100" />
                </div>
              </AddToWishlist>
              <div className="p-1 border border-tert-100">
                <Link href={`/shop/${name}`}>
                  <Search className="text-tert-100" />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="text-center pb-[1em]">
          <a
            href="#"
            className={` ${featured && "truncate"} h6 text-decoration-none block text-[0.92rem] `}
          >
            {name}
          </a>
          <div className="flex items-center justify-center mt-2">
            <h5 className="font-semibold">&#8377;{price}</h5>
            <h6 className="text-xs text-gray-500 ml-2 line-through">&#8377; {basePrice}</h6>
          </div>
          <div className="flex items-center justify-center mb-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-tert-100"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a.75.75 0 01.698.465l1.54 3.448 3.849.39a.75.75 0 01.415 1.285l-2.786 2.56.826 3.766a.75.75 0 01-1.088.806L10 14.498l-3.438 1.82a.75.75 0 01-1.088-.806l.826-3.766-2.786-2.56a.75.75 0 01.415-1.285l3.849-.39 1.54-3.448A.75.75 0 0110 2z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
