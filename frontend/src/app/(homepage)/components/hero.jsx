import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    link: "./banners/banner1.jpg",
    alt: "Ayurvedic products ",
  },
  {
    link: "./banners/banner2.jpg",
    alt: "Sports Supplement",
  },
  {
    link: "./banners/banner3.jpg",
    alt: "Vitamins and Supplement",
  },
];

export const Hero = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="h-full">
        <div className="relative h-full group overflow-hidden">
          <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false}>
            {images.map((image, index) => (
              <div key={index}>
                <figure>
                  <img
                    width={100}
                    height={100}
                    className="w-full image--2 my-auto"
                    src={image.link}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <figcaption> {image.alt} </figcaption>
                </figure>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
