"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const PriceFilter = ({ className }) => {
  const priceRanges = [
    { id: "price-all", label: "All Price", min: 0, max: Infinity },
    { id: "price-1", label: "0 - 100", min: 0, max: 100 },
    { id: "price-2", label: "100 - 200", min: 100, max: 200 },
    { id: "price-3", label: "200 - 300", min: 200, max: 300 },
    { id: "price-4", label: "300 - 400", min: 300, max: 400 },
    { id: "price-5", label: "400 - 500", min: 400, max: 500 },
    { id: "price-6", label: "Above 500", min: 500, max: Infinity },
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let params = new URLSearchParams(searchParams);

  const handleChange = (min, max) => {
    if (params.get('minprice') == min && params.get('maxprice') == max) {
      params.delete('minprice');
      params.delete('maxprice');
    } else {
      params.set('minprice', min);
      params.set('maxprice', max);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("h-min w-full", className)}>
      <h2 className="h2-primary">Filter By Price</h2>
      <div className="bg-white p-4 px-6 mb-30">
        <form>
          {priceRanges.map((range) => (
            <div key={range.id} className="flex justify-between items-start mb-3">
              <div className="flex gap-10">
                <input
                  type="checkbox"
                  className="w-4 border-none"
                  id={range.id}
                  onChange={() => handleChange(range.min, range.max)}
                  checked={
                    params.get('minprice') == range.min &&
                    params.get('maxprice') == range.max
                  }
                />
                <label className="text-slate-600" htmlFor={range.id}>
                  {range.label}
                </label>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
