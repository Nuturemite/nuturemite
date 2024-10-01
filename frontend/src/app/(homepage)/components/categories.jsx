import { useCategories } from "@/lib/data";
import Link from "next/link";

export const Categories = () => {
  const { categories, isLoading } = useCategories();
  const categoriess = categories?.slice(0, 8) || [];

  if (isLoading) return <SkeletonLoader count={8} />;
  return (
    <div>
      <h2 className="h2-primary">Categories</h2>
      <div className="grid-4">
        {categoriess.map(cat => (
          <Link href={`/shop?categoryId=${cat._id}`}>
            <div key={cat._id} className="bg-white ">
              <div href="#" className="text-decoration-none">
                <div className="flex flex-col md:flex-row md:items-center px-4  ">
                  <div className="overflow-hidden" style={{ width: "100px", height: "100px" }}>
                    <figure>
                      <img
                        className="w-full  h-full object-cover"
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                      />
                      <figcaption>{cat.description}</figcaption>
                    </figure>
                  </div>
                  <div className="flex-grow text-center pl-3 px-4 h-full">
                    <h6>{cat.name}</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SkeletonCategory = () => {
  return (
    <div className="bg-white p-4 shadow-sm animate-pulse ">
      <div className="w-full h-16 bg-gray-200 "></div>
    </div>
  );
};

const SkeletonLoader = ({ count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCategory key={index} />
      ))}
    </div>
  );
};
