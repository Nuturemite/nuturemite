import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton({ count }) {
  return (
    <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <div key={index}>
          <Skeleton className="h-[325px] w-[250px] " />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
