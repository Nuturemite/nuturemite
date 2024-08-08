"use client";

import Error from "@/components/shared/error";
import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import { useProducts } from "@/lib/data";
import { PriceFilter } from "./components/PriceFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import ClearFilter from "./components/ClearFilter";
import { Button } from "@/components/ui/button";
import PaginationComp from "@/components/shared/common/pagination";
import { SortComp } from "./components/SortComp";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/shared/loader";

function Page() {
  const searchParams = useSearchParams();
  
  const filters = {
    minPrice: searchParams.get("minprice"),
    maxPrice: searchParams.get("maxprice"),
    minDiscount: searchParams.get("minDiscount"),
    categoryId: searchParams.get("categoryId"),
    sortBy: searchParams.get("sortBy"),
    query: searchParams.get("query"),
    limit: searchParams.get("limit") || 9,
    page: searchParams.get("page") || 1,
    minRating: searchParams.get("minRating"),
    productId: searchParams.get("productId"),
    active:true,
  };

  const { products, isLoading, error, totalPages } = useProducts(filters);

  if (error) return <Error />;

  const renderProductPage = () => {
    if (isLoading) return <Loader />;

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-between w-full">
          <h3 className="text-2xl font-bold mb-4">No products found</h3>
          <p className="text-gray-500">
            Oops! It seems like we could not find any products with the given criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mt-6 md:flex gap-10 flex-1 pb-10 scroll-smooth">
        <aside className="max-md:hidden md:basis-1/4">
          <CategoryFilter />
          <PriceFilter className="mt-10" />
          <ClearFilter isChild>
            <Button className="bg-red-600 w-full mt-3">Clear filters</Button>
          </ClearFilter>
        </aside>
        <main className="md:basis-3/4">
          <div className="md:flex mb-4">
            <SortComp className="ml-auto" />
          </div>
          {renderProductPage()}
        </main>
      </div>
      <PaginationComp totalPages={totalPages} />
    </div>
  );
}

export default Page;
