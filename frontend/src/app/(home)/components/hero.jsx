"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div>
      <div className="w-full mt-10 lg:mt-0 lg:flex items-center justify-between">
        <div className="basis-1/2">
          <h1 className="text-3xl md:text-5xl text-slate-600 font-bold">
            Unveil Your World: Explore, Shop, and Thrive with Us!
          </h1>
          <p className=" pt-5 w-[80%]">
            Welcome to our digital wonderland, where every click opens a door to delight. Dive into
            a realm where innovation meets elegance,
          </p>
          <div className="pt-6 flex gap-4">
            <Link href={"/shop"}>
              <Button>Shop now</Button>
            </Link>
            <Button variant="outline">Explore</Button>
          </div>
        </div>
        <div className="pb-20">
          <img className=" mix-blend-multiply" src="hero.png" alt="" />
        </div>
      </div>
    </div>
  );
};
