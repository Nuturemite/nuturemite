import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "../shop/components/ProductSkeleton";

export const RecentProducts = () => {
  const { products, isLoading, error } = useProducts({ limit: 4 });
  if (isLoading) return <ProductSkeleton count={8} />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="uppercase mb-6 text-4xl text-slate-500 font-medium ">Recent Products</h2>
     <div className="grid grid-cols-2 gap-4">
        <img src="./banners/banner1.jpg" className="h-full w-full  " alt="Carousel 1" />
  
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
     </div>
    </div>
  );
};
