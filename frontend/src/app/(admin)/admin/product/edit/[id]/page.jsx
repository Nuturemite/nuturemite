"use client";
import React from "react";
import ProductForm from "../../form";
import { useBaseProduct } from "@/lib/data";

export default function page({ params }) {
  const { product, isLoading } = useBaseProduct(params.id);
  console.log(product)
  console.log(product);
  return <ProductForm params={params} product={product} isLoading={isLoading} update />;
}
