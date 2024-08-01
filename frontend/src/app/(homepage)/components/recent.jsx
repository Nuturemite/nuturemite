import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "../../(home)/shop/components/ProductSkeleton";

export const RecentProducts = () => {
  const { products, isLoading, error } = useProducts({ limit: 5 });
  if (isLoading) return <ProductSkeleton count={3} />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <h2 className="uppercase mb-10 text-3xl text-slate-100 font-medium text-center">
        Recent Products
      </h2>
      <div className="grid grid-cols-1  min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full h-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} featured={true} />
        ))}
      </div>
    </div>
  );
};
