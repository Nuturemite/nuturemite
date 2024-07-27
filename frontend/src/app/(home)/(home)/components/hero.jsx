import { Button } from "@/components/ui/button";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Hero = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="md:basis-[60%] h-full">
        <div className="relative h-full group overflow-hidden">
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
          >
            {[
              "./banners/banner3.jpg",
              "./banners/banner4.jpg",
              "./banners/banner5.jpg",
              "./banners/banner6.jpg",
              "./banners/banner7.jpg",
              "./banners/banner8.jpg",
              "./banners/banner9.jpg",
            ].map((image, index) => (
              <div key={index}>
                <img
                  className="w-full image--2"
                  src={image}
                  alt={`Product Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col basis-[30%] gap-5 h-full justify-between max-md:hidden">
        {[1, 2].map(i => (
          <div key={i} className="relative flex-1 group overflow-hidden">
            <img
              src={`./banners/banner${i}.jpg`}
              className="w-full h-full image-primary"
              alt={`Carousel ${i}`}
            />
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
};
