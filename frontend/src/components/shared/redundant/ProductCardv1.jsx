import Link from "next/link";
import React from "react";
import AddToWishlist from "@/components/shared/redundant/AddToWishlist";
import { Icon } from "@iconify/react";

export const ProductCard = ({ product }) => {
  const { title, price, discount, avgRating } = product;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="group flex w-full  flex-col">
      <Link
        href={`/shop/${product.slug}`}
        className="relative flex h-48 md:h-72 overflow-hidden rounded-xl"
      >
        <img
          className="peer absolute top-0 right-0 h-full w-full object-cover"
          src={product.image ? product.image : "/test2.png"}
          alt="product image"
        />
      </Link>
      <div className="mt-4 pb-5">
        <div className="flex justify-between max-sm:flex-col">
          <div>
            <Link href={`/shop/${product.slug}`}>
              <h5 className="tracking-tight">{title}</h5>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <div className="space-x-1">
                {discount && <span className="text-lg md:text-xl ">${discountedPrice}</span>}
                <span className={`${discount && "line-through text-red-600 text-sm"} `}>
                  {" "}
                  ${price}
                </span>
                {discount && <span className="text-sm text-green-600">{discount}% off</span>}
              </div>
            </div>
            <div>
              <span className="text-slate-500 md:text-sm text-xs">A Brand by </span>
              <span className="text-slate-700 text-sm">{product.brand.name}</span>
            </div>
          </div>
          <div className="flex md:flex-col max-sm:mt-2 gap-3 md:items-center">
            <AddToWishlist product={product} />
            {avgRating && (
              <div className="text-xs px-1 py-[0.125rem] flex items-center text-white bg-green-600 gap-1 rounded">
                <span className>{Math.ceil(avgRating * 10) / 10}</span>
                <Icon icon="ic:round-star" />
              </div>
            )}
          </div>
        </div>
        {/* <AddToCart product={product} />z */}
      </div>
    </div>
  );
};
