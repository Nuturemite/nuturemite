"use client";
import Link from "next/link";
import { useWishlist } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/common/error";
import { tst } from "@/lib/utils";
import api from "@/lib/api";

const Wishlist = () => {
  const { wishlistItems, isLoading, error, mutate } = useWishlist();

  async function handleItemRemove(wishlistItem) {
    try {
      await api.delete(`/wishlist/${wishlistItem.product._id}`);
      mutate();
    } catch (error) {
      tst.error(error);
    }
  }
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  if (wishlistItems.length === 0)
    return (
      <div className="w-full flex  justify-between pt-40 items-center text-center text-slate-500 text-2xl">
        Add item to wishlist
      </div>
    );

  return (
    <div className="w-full relative">
      <h2 className="h2-primary">Wishlist</h2>

      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className=" divide-gray-200 divide-y-4">
            {wishlistItems.map(wishlistItem => (
              <li key={wishlistItem._id} className="flex py-3 bg-white w-full px-4 ">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden  border border-gray-200">
                  <img
                    src={
                      wishlistItem.product.images.length != 0
                        ? wishlistItem.product.images[1]
                        : "./noimage.png"
                    }
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col gap-6 ">
                  <Link href={`/shop/${wishlistItem.product._id}`} className="flex">
                    <div>
                      <div className="text-base font-medium text-gray-900">
                        <h3>{wishlistItem.product.name}</h3>
                      </div>
                      <span>Price: </span>
                      <span> &#8377;{wishlistItem.product.price} </span>
                      <span className="font-normal text-sm line-through text-red-500 ">
                        &#8377;{wishlistItem.product.basePrice}
                      </span>
                    </div>
                  </Link>

                  <p>
                    <button
                      onClick={() => handleItemRemove(wishlistItem)}
                      type="button"
                      className="font-medium text-orange-600 hover:text-orange-500"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
