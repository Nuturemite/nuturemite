"use client";
import React from "react";
import { CheckCircle, Truck, Phone, Car } from "lucide-react";
import { ProductCard } from "@/app/(home)/shop/components/ProductCard";



export default function page() {
  return (
    <div>
      <Featured />
      <Categories />
      <RecentProducts />
    </div>
  );
}

