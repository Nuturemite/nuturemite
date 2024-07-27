import { Button } from "@/components/ui/button";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Offer() {
  return (
    <div>
      <div className="flex gap-5  justify-between h-[500px] overflow-hidden ">
        {[1, 2].map(i => (
          <div key={i} className="relative flex-1 group overflow-hidden">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {Array.from({ length: 4 }, (_, index) => (
                  <CarouselItem key={index}>
                    <img
                      className="w-full image-primary-2"
                      src={`/banners/banner${(index+2) * (i + 1)}.jpg`}
                      alt={`Product Image ${(index+2) * (i + 1)}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
              <h2 className="text-slate-100 font-bold mb-4">Save 20%</h2>
              <h2 className="text-white text-xl font-bold mb-4">Special Offer</h2>
              <Button size="sm">Shop Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
