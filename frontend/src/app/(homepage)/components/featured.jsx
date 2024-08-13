import { ProductCard } from "@/app/(home)/shop/components/ProductCard";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/lib/data";
import ProductSkeleton from "../../(home)/shop/components/ProductSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedProducts = () => {
  const { products, isLoading, error } = useProducts({
    featured: true,
  });
  if (isLoading) return <ProductSkeleton count={3} />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <h2 className="uppercase mb-10 text-3xl  font-medium text-center">Featured Products</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="min-[400px]:basis-1/2 md:basis-1/3 lg:basis-1/5 space-y-10"
            >
              <ProductCard key={product.id} product={product} featured={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
