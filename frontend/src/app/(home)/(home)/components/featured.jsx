import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "../../shop/components/ProductSkeleton";

export const FeaturedProducts = () => {
  const { products, isLoading, error } = useProducts({ limit: 5, minDiscount: 15 });
  if (isLoading) return <ProductSkeleton count={5} />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="uppercase mb-6 text-4xl text-slate-500 font-medium ">Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
