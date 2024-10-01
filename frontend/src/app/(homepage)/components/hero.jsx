import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useBanners } from "@/lib/data";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";

export const Hero = () => {
  const { banners , isLoading,error} = useBanners();

  if (isLoading) return <Loader height="80vh" />;
  if (error) return <Error />;

  return (
    <div className="flex justify-between items-center">
      <div className="h-full">
        <div className="relative h-full group overflow-hidden">
          <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false}>
            {banners.map((banner, index) => (
              <div key={index}>
                <figure>
                  <img
                    width={100}
                    height={100}
                    className="w-full image--2 my-auto"
                    src={banner.image}
                    alt={banner.title}
                    loading="lazy"
                  />
                  <figcaption> {banner.title} </figcaption>
                </figure>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
