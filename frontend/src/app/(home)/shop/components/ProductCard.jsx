import React from "react";
import { ShoppingCart, Heart, Search } from "lucide-react";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";
import Link from "next/link";

export const ProductCard = ({ product }) => {
  const { _id, images, name, basePrice, price, avgRating ,inventory} = product;

  return (
    <Link href={`/shop/${_id}`}>
      <div className="w-full group hover:shadow-md cursor-pointer bg-white p-2">
        <div className="bg-white mb-4 relative overflow-hidden">
          <img
            className="w-full  aspect-auto object-cover p-2 group-hover:scale-110 group-hover:brightness-50 transition duration-500"
            src={images?.length != 0 ? images[1] : "./noimage.png"}
            alt={name}
          />
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 group-hover:flex space-x-6 hidden">
            <AddToCart product={product} isChild>
              <div className="p-1 border border-primary">
                <ShoppingCart className="text-primary" />
              </div>
            </AddToCart>
            <AddToWishlist product={product} isChild>
              <div className="p-1 border border-primary">
                <Heart className="text-primary" />
              </div>
            </AddToWishlist>
            <div className="p-1 border border-primary">
              <Link href={`/shop/${name}`}>
                <Search className="text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center py-4">
          <a href="#" className="h6 text-decoration-none block text-[0.92rem] ">
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
                className="h-4 w-4 text-primary"
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
            <small className="ml-1">({avgRating})</small>
          </div>
        </div>
      </div>
    </Link>
  );
};
