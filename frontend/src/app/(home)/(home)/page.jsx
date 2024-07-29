"use client";
import { Featured } from "./components/features";
import { Categories } from "./components/categories";
import { Hero } from "./components/hero";
import { RecentProducts } from "./components/recent";
import { Offer } from "./components/offer";
import { FeaturedProducts } from "./components/featured";

export default function Page() {
  return (
    <div >
      <section className="space-y-20 ">
        <div className="mt-6">
          <Hero />
        </div>
        {/* <div className="">
          <Categories />
        </div> */}
        <div className="">
          <RecentProducts />
        </div>
        {/* <div className="">
          <Offer />
        </div> */}
        <div className="">
          <FeaturedProducts />
        </div>
        <div className="">
          <Featured />
        </div>
      </section>
    </div>
  );
}
