"use client";
import React, { useState } from "react";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useProduct } from "@/lib/data";
import { Icon } from "@iconify/react";
import AddToCart from "../components/AddToCart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductTab from "./tabs/product-tab";
import ImageZoom from "@/components/ui/image-zoom";
import OutLoader from "@/components/ui/outloader";
import Head from "next/head";
import { IMAGE_URL } from "@/constants";

export default function Product({ params }) {
  const slug = params.slug;
  const { product, isLoading, error } = useProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pending,setPending] = useState();

  if (isLoading) return <Loader />;
  if (error) return <Error />;
  const displayImage = `${IMAGE_URL}/${selectedImage || product.images[0]}` || "./noimage.png";

  return (
    <>
    <Head>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={product.keywords} />
    </Head>
    <div className="py-8 pt-10">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image Sidebar */}
          <div className="basis-[7%] p-3 space-y-2 bg-white">
            <div className="flex flew-row md:flex-col space-y-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  className="w-full h-20 object-cover cursor-pointer border-2 border-transparent hover:border-slate-600"
                  src={`${IMAGE_URL}/${image}` || "./noimage.png"}
                  alt={product.name}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Selected Image Display */}
          <div className="md:px-4 md:basis-[40%]">
            <div className="md:h-[600px] p-4 bg-white mb-4">
              <ImageZoom>
                <img
                  className="w-full h-full object-cover overflow-hidden object-center"
                  src={displayImage}
                  alt="Product Image"
                />
              </ImageZoom>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 md:basis-[40%] p-4 md:p-10 bg-white">
            <p className="text-slate-600 text-3xl font-bold mb-4">{product.name}</p>
            <div className="mb-4 space-y-4">
              <div className="mr-4">
                <span className="text-2xl text-slate-500">&#8377;{product.price} </span>
                <span className="line-through text-red-600 text-lg">
                  &#8377;{product.mrp}
                </span>
                <span className="text-green-600 ">
                  {" "}{product.discountPercent}% off
                </span>
              </div>

              <div>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    className="inline text-xl text-orange-500"
                    icon="mingcute:star-fill"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-slate-600 mt-2 mb-8">{product.description}</p>
              {/* <p className="text-slate-600 mt-2 mb-8">
                <strong>Keywords: </strong>
                {product.keywords}
              </p> */}
              <p className="text-slate-600 mt-2 mb-8">
                <strong>Categories: </strong>
                {product.categories.map(category => category.name).join(", ")}
              </p>
            </div>
            {!product.quantity || product.quantity === 0 ? (
              <div className="text-red-600 text-xl font-bold mb-4">Out of Stock</div>
            ) : (
              // Add to cart
              <div className="flex flex-row mb-4 gap-4 items-center">
                <Select
                  className="w-full"
                  value={quantity}
                  onValueChange={value => setQuantity(value)}
                >
                  <SelectTrigger className="border-slate-600 w-full md:w-32 focus:ring-0">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(product.quantity, 100) }, (_, i) => i + 1).map(
                      i => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <AddToCart setPending={setPending} quantity={quantity} product={product} />
              </div>
            )}
          </div>
        </div>
        <ProductTab product={product} />
      </div>
      <OutLoader loading={pending}/>
    </div>
    </>
  );
}
