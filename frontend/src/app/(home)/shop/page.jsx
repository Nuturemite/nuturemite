"use client";
import Error from "@/components/shared/error";
import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "./components/ProductSkeleton";
import { PriceFilter } from "./components/PriceFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import Link from "next/link";
import ClearFilter from "../../../components/shared/redundant/ClearFilter";
import { Button } from "@/components/ui/button";
import PaginationComp from "@/components/shared/common/pagination";
import { SortComp } from "./components/SortComp";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const minPrice = searchParams.get("minprice");
  const maxPrice = searchParams.get("maxprice");
  const minDiscount = searchParams.get("minDiscount");
  const categoryId = searchParams.get("categoryId");
  const sortBy = searchParams.get("sortBy");
  const query = searchParams.get("query");

  const { products, isLoading, error, totalPages } = useProducts({
    minPrice,
    maxPrice,
    minDiscount,
    categoryId,
    sortBy,
    query,
  });

  if (error) return <Error />;

  const ProductPage = () => {
    if (isLoading) return <ProductSkeleton count={20} />;

    if (products.length == 0) {
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
      <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mt-6 flex gap-10 flex-1 pb-10 scroll-smooth">
        <div className="basis-1/4">
          <CategoryFilter />
          <PriceFilter className="mt-10" />
          <ClearFilter isChild>
            <Button className="bg-red-600 w-full mt-3">Clear filters</Button>
          </ClearFilter>
        </div>
        <div className=" basis-3/4">
          <div className="flex mb-4">
            <SortComp className={"ml-auto"} />
          </div>
          <ProductPage />
        </div>
      </div>
      <div>
        <PaginationComp totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page;
