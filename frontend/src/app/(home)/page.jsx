"use client";
import { Featured } from "./components/featured";
import { Categories } from "./components/categories";
import { Hero } from "./components/hero";
import { RecentProducts } from "./components/recent";
import { Offer } from "./components/offer";

export default function Page() {
  return (
    <div className="py-10">
      <section className="space-y-20">
        <Hero />
        <Featured />
        {/* <Categories /> */}
        <RecentProducts />
        <Offer />
        <RecentProducts />
      </section>
    </div>
  );
}

