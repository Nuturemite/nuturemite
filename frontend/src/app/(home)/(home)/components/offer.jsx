import { Button } from "@/components/ui/button";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function Offer() {
  return (
    <div className="flex gap-5  justify-between">
      {[1, 2].map(i => (
        <div key={i} className="relative flex-1 group overflow-hidden">
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index}>
                <img
                  className="w-full image-primary-2 h-[300px]"
                  src={`/banners/banner${index + 1 + (i - 1) * 6}.jpg`}
                  alt={`Product Image ${index + 1 + (i - 1) * 6}`}
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
            <h2 className="text-slate-100 font-bold mb-4">Save 20%</h2>
            <h2 className="text-white text-xl font-bold mb-4">Special Offer</h2>
            <Button size="sm">Shop Now</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
