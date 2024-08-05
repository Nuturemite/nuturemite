"use client";
import React from "react";
import ProductForm from "@/components/forms/ProductForm";
import { useBaseProduct } from "@/lib/data";
import Loader from "@/components/shared/loader";

export default function page({ params }) {
  const { product, isLoading } = useBaseProduct(params.id);
  if (isLoading) return <Loader/>;
  return <ProductForm params={params} product={product} update />;
}
