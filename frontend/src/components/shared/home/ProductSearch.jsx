"use client";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/lib/data";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

function ProductSearch({ className }) {
  const [search, setSearch] = useState("");
  const { products, isLoading, error } = useProducts({ search });

  if (error) return <div>Error loading products</div>;

  return (
    <div className={cn("w-[400px]", className)}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon fontSize={24} className="text-slate-400" icon="ion:search" />
        </div>
        <Input
          type="search"
          id="default-search"
          className={cn(
            "block w-full font-normal p-3 pl-10 text-sm text-slate-900 focus-within:outline-none border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500",
            className
          )}
          placeholder="Search ..."
          onChange={e => setSearch(e.target.value)}
        />
        {search.length >= 3 && (
          <div className="absolute z-50 top-10 -left-20 bg-white w-[600px] max-h-[400px] overflow-y-scroll animate-height divide-y-2">
            {isLoading ? (
              <div>Loading..</div>
            ) : products.length > 0 ? (
              products.map(product => (
                <>
                  <Link
                    key={product._id}
                    href={`/shop/${product._id}`}
                    onClick={() => setSearch("")}
                    className="hover:bg-slate-200 group"
                  >
                    <div className="flex items-center gap-4 p-2 group:hover:translate-x-2 ">
                      <img
                        className="h-16"
                        src={product.images[1] || "./noimage.png"}
                        alt={"Product image"}
                      />
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </div>
                  </Link>
                  <Separator />
                </>
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
