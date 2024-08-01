"use client";
import ProductTable from "@/components/shared/admin/product/table";
import { useProducts } from "@/lib/data";

export default function page() {
  const { products, isLoading, error, mutate } = useProducts();

  return <ProductTable products={products} isLoading={isLoading} error={error} mutate={mutate} />;
}
