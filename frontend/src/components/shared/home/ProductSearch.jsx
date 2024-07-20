"use client";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/lib/data";
import { useState } from "react";
import Link from "next/link";

function ProductSearch({ className }) {
  const [search, setSearch] = useState("");
  const { products, isLoading, error } = useProducts({ search });
  if (error) return;
  return (
    <>
      <div class={cn("w-[400px] ", className)}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon fontSize={24} className="text-slate-400" icon="ion:search" />
          </div>
          <Input
            type="search"
            id="default-search"
            className={cn(
              "block w-full font-normal p-3 pl-10 text-sm text-slate-900 focus-within:outline-none border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 ",
              className
            )}
            placeholder="Search ..."
            onChange={e => setSearch(e.target.value)}
          />{" "}
          {search.length >= 3 && (
            <div className="absolute z-50 top-10 -left-20 bg-white w-[600px] max-h-[400px] overflow-y-scroll animate-height divide-y-2 ">
              {isLoading ? (
                <div>Loading..</div>
              ) : (
                products.map(product => (
                 <Link href={`/shop?productId=${product.productId}`} onClick={() => setSearch("")}>
                      <div key={product._id} className="flex items-center gap-4 ">
                        <img
                          className="h-16"
                          src={ "./noimage.png"}
                          alt={product.name}
                        />
                        <div className="">
                          <p>{product.name}</p>
                        </div>
                      </div>
                 </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductSearch;
