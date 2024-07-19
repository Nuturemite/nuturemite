"use client";
import { Featured } from "./components/featured";
import { Categories } from "./components/categories";
import { Carousel } from "./components/carousel";
import { RecentProducts } from "./components/recent";
import { Offer } from "./components/offer";

export default function Page() {
  return (
    <div className="py-10">
      <section className="space-y-20">
        <Carousel />
        <Featured />
        <Categories />
        <RecentProducts />
        <Offer />
        <RecentProducts />
      </section>
    </div>
  );
}

