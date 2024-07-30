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
      <h2 className="uppercase mb-6 text-4xl text-slate-100 font-medium ">Recent Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
