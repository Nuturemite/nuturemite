"use client";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useProduct, useProducts } from "@/lib/data";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ProductPageSkeleton from "./skeleton";
import AddToCart from "../components/AddToCart";
import AddToWishlist from "../components/AddToWishlist";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tabs from "./tabs";

export default function Product({ params }) {
  const id = params.id;
  const { product, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  // const { products, isLoading: isProductLoading } = useProducts({ catgoryId: product?.categoryId })

  if (isLoading) return <ProductPageSkeleton count={1} />;

  if (error) return <Error />;

  return (
    <div className=" py-8 pt-10">
      <div className="mx-auto ">
        <div className="flex flex-col  md:flex-row gap-8">
          {/* Carousel */}
          <div className="px-4 basis-2/5">
            <div className="h-[460px] p-10 bg-white test:bg-slate-700 mb-4">
              <Carousel>
                <CarouselContent>
                  {product.images?.map(image => (
                    <CarouselItem key={image}>
                      <img
                        className="w-full h-full object-cover overflow-hidden object-center "
                        src={image || "./noimage.png"}
                        alt="Product Image"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 p-10 bg-white basis-1/5">
            <p className="text-slate-600 text-3xl font-bold  mb-4">{product.name}</p>
            <div className="mb-4 space-y-4">
              <div className="mr-4">
                <span className="text-2xl text-slate-500 ">${product.price}</span>
                <span className={`${"line-through text-red-600 text-lg"} `}>
                  {" "}
                  ${product.basePrice}
                </span>
                <span className="text-sm text-green-600">
                  {" "}
                  {product.basePrice - product.price}% off
                </span>
              </div>

              <div>
                {[...Array(5)].map(index => (
                  <Icon
                    key={index}
                    className="inline text-xl text-orange-500"
                    icon="mingcute:star-fill"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-600 test:text-slate-300 mt-2 mb-8">
                {product.description ||
                  ` Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Exercitationem vel sint perspiciatis velit sunt pariatur odio debitis laborum,
              quas nesciunt numquam id aspernatur dolore itaque quia? Magnam itaque similique
              accusamus.`}
              </p>
            </div>
            <div className="flex mb-4 gap-4 items-center">
              <Select
                className="w-full"
                value={quantity}
                onValueChange={value => setQuantity(value)}
              >
                <SelectTrigger className="border-slate-600 w-32 focus:ring-0">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {<AddToCart quantity={quantity} product={product} />}
            </div>
          </div>

          {/* You May Also Like */}
          {/*    {!isProductLoading && (
            <div>
              <h2 className="h2-primary">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )} */}
        </div>
        <Tabs />
      </div>
    </div>
  );
}
{
  /* <Review product={product} /> */
}
