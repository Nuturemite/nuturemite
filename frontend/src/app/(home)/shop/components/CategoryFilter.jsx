"use client";
import { useCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryFilter = ({ className }) => {
  const { categories, isLoading } = useCategories();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let params = new URLSearchParams(searchParams);
  const handleCategoryChange = categoryId => {
    const currentCategoryId = params.get("categoryId");

    if (currentCategoryId === categoryId) {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("h-min w-full", className)}>
      <h2 className="h3-primary whitespace-nowrap">Filter By Category</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 px-6 mb-30">
          <form className="">
            {categories.map(category => (
              <div key={category._id} className="flex justify-between items-start">
                <div className="flex gap-10  mb-3">
                  <button
                    type="button"
                    className={`text-base ${
                      params.get("categoryId") == category._id
                        ? "text-blue-500 font-bold"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {category.name}
                  </button>
                </div>
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-min w-full p-10 bg-white">
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className="w-full" />
      ))}
    </div>
  );
};
