import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/lib/data";

export const RecentProducts = () => {
  const { products, isLoading, error } = useProducts({limit:4});

  if (isLoading) return <Loader/>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="uppercase mb-6 text-4xl text-slate-500 font-medium ">
        Recent Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

