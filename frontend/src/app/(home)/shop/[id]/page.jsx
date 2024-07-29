"use client";
import React, { useState } from "react";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useProduct } from "@/lib/data";
import { Icon } from "@iconify/react";
import ProductPageSkeleton from "./skeleton";
import AddToCart from "../components/AddToCart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tabs from "./tabs";
import ImageZoom from "@/components/ui/image-zoom";

export default function Product({ params }) {
  const id = params.id;
  const { product, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <ProductPageSkeleton count={1} />;

  if (error) return <Error />;

  // Default image if none is selected
  const displayImage = selectedImage || product.images?.[0] || "./noimage.png";

  return (
    <div className="py-8 pt-10">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image Sidebar */}
          <div className="basis-[7%] p-3 space-y-2 bg-white">
            <div className="flex flex-col space-y-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  className="w-full h-20 object-cover cursor-pointer border-2 border-transparent hover:border-slate-600"
                  src={image || "./noimage.png"}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Selected Image Display */}
          <div className="px-4 basis-[40%]">
            <div className="h-[600px] p-4 bg-white mb-4">
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
          <div className="md:flex-1 basis-[40%] p-10 bg-white">
            <p className="text-slate-600 text-3xl font-bold mb-4">{product.name}</p>
            <div className="mb-4 space-y-4">
              <div className="mr-4">
                <span className="text-2xl text-slate-500">${product.price}{" "}</span>
                <span className="line-through text-red-600 text-lg"> ${product.basePrice}</span>
               
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
              <p className="text-slate-600 mt-2 mb-8"><strong>Keywords:  </strong>{product.keywords}</p>
              <p className="text-slate-600 mt-2 mb-8"><strong>Categories:  </strong>{product.categories.map(category => category.name)}</p>
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
              <AddToCart quantity={quantity} product={product} />
            </div>
          </div>
        </div>
        <Tabs product={product} />
      </div>
    </div>
  );
}
