'use client'
import { Featured } from "./components/features";
import { Categories } from "./components/categories";
import { Hero } from "./components/hero";
import { RecentProducts } from "./components/recent";
import { FeaturedProducts } from "./components/featured";
import Head from "next/head";
export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content={`"Discover expert health tips, natural remedies, and wellness advice at Nuturemite. Empower your lifestyle with nutritious recipes, fitness routines, and holistic solutions for a healthier you."`}
        />
      </Head>
      <div>
        <section className="space-y-8 ">
          <div className="mt-5">
            <div>
              <Hero />
            </div>
            <div className="mt-8 px-4 md:px-16">
              <Featured />
            </div>
          </div>
          <div className="px-4 md:px-16 my-16">
            <Categories />
          </div>
          <div className="bg-primary">
            <div className="px-16 py-10">
              <RecentProducts />
            </div>
          </div>
          <div className="px-16">
            <FeaturedProducts />
          </div>
        </section>
      </div>
    </>
  );
}
