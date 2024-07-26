import { Button } from "@/components/ui/button";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Hero = () => {
  return (
    <div className="h-[80vh] flex justify-between items-center">
      <div className="md:basis-[67%] h-full">
        <div className="relative h-full group overflow-hidden">
          {/* <img src="./carousel-1.jpg" className="h-full w-full image-primary-2 " alt="Carousel 1" /> */}
          <Carousel>
            <CarouselContent>
              {[
                "./banners/banner3.jpg",
                "./banners/banner4.jpg",
                "./banners/banner5.jpg",
                "./banners/banner6.jpg",
                "./banners/banner7.jpg",
                "./banners/banner8.jpg",
                "./banners/banner9.jpg",
              ].map((image) => (
                <CarouselItem key={image}>
                  <img
                    className="w-full image-primary-2 "
                    src={image}
                    alt="Product Image"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="absolute inset-0 flex flex-col justify-center items-center w-[60%] mx-auto">
            <h2 className="text-white text-3xl font-bold mb-4">Organic Items</h2>
            <p className="text-white text-sm text-center mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum purus
              vitae lectus blandit.
            </p>
            <Button size="sm">Shop Now</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col basis-[30%] gap-5 h-full justify-between max-md:hidden">
        {[1, 2].map(i => (
          <div key={i} className="relative  flex-1 group overflow-hidden">
            <img
              src={`./banners/banner${i}.jpg`}
              className="w-full h-full image-primary  "
              alt={`Carousel ${i}`}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
              <h2 className="text-slate-100  font-bold mb-4">Save 20%</h2>
              <h2 className="text-white text-xl font-bold mb-4">Special Offer</h2>
              <Button size="sm">Shop Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
