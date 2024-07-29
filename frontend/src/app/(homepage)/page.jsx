"use client";
import { Featured } from "./components/features";
import { Categories } from "./components/categories";
import { Hero } from "./components/hero";
import { RecentProducts } from "./components/recent";
import { Offer } from "./components/offer";
import { FeaturedProducts } from "./components/featured";

export default function Page() {
  return (
    <div>
      <section className="space-y-20 ">
        <div className="mt-12">
          <Hero />
        </div>
        <div className="px-16">
          <Featured />
        </div>
        {/* <div className="px-16">
          <Categories />
        </div> */}
        <div className="bg-primary">
          <div className="px-16 py-10">
          <RecentProducts />

          </div>
        </div>
        {/* <div className="px-16">
          <Offer />
        </div> */}
        <div className="px-16">
          <FeaturedProducts />
        </div>
      </section>
    </div>
  );
}
