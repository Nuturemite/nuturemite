"use client";

import Error from "@/components/shared/common/error";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "./shop/components/ProductSkeleton";
import { ProductCard } from "./shop/components/ProductCard";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
function Home() {
  const { products, isLoading, error } = useProducts();

  if (error) return <Error />;

  return (
    <div className="pb-80">
      <div className="w-full min-h-screen max-sm:pt-10 md:flex  items-center justify-between">
        <div className="basis-1/2">
          <h1 className="text-3xl md:text-5xl text-slate-600 font-bold">
            Unveil Your World: Explore, Shop, and Thrive with Us!
          </h1>
          <p className=" pt-5 w-[80%]">
            Welcome to our digital wonderland, where every click opens a door to delight. Dive into
            a realm where innovation meets elegance,
          </p>
          <div className="pt-6 flex gap-4">
            <Link href={"/shop"}>
              <Button>Shop now</Button>
            </Link>
            <Button variant="outline">Explore</Button>
          </div>
        </div>
        <div className="pb-20">
          <img className=" mix-blend-multiply" src="hero.png" alt="" />
        </div>
      </div>
      <div className="max-sm:flex-col gap-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold mt-2">Most popular</h2>
          <p>All our new arrivals in a exclusive brand selection</p>
        </div>
        <Link href="/shop">
          <div className="flex gap-2 text-blue-500 border-b-2 border-blue-500">
            <div className=" text-blue-500 self-end">View More</div>
            <ArrowRight />
          </div>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <ProductSkeleton count={9} />
        ) : (
          <div className="w-full mt-10">
            {products.length == 0 && (
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-4">No products found</h3>
                <p className="text-gray-500">
                  Oops! It seems like we could not find any products with the given criteria.
                </p>
              </div>
            )}
            <div className="md:flex gap-8 flex-wrap items-start">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {products.map(product => (
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <ProductCard key={product.id} product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="max-sm:hidden" />
                <CarouselNext className="max-sm:hidden" />
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
