import { Button } from "@/components/ui/button";
import React from "react";

export function Offer() {
  return (
    <div>
      <div className="flex gap-5 h-full justify-between">
        {[2, 3].map(i => (
          <div key={i} className="relative flex-1 group overflow-hidden">
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
}
