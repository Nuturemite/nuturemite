import { Button } from "@/components/ui/button";
import React from "react";

export const Carousel = () => {
  return (
    <div className="h-[60vh] flex justify-between items-center">
      <div className="basis-[67%] h-full">
        <div className="relative h-full group overflow-hidden">
          <img
            src="./carousel-1.jpg"
            className="h-full w-full image-primary"
            alt="Carousel 1"
          />
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
      <div className="flex flex-col basis-[30%] gap-5 h-full justify-between">
        {[2, 3].map(i => (
          <div key={i} className="relative  flex-1 group overflow-hidden">
            <img
              src={`./carousel-${i}.jpg`}
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
