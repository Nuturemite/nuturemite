"use client";
import React from "react";
import VendorProductForm from "../../form";
import { useBaseProducts } from "@/lib/data";

export default function Page({ params }) {
  const { products, error: productsError, isLoading } = useBaseProducts({ id: params.id });
  const productDetails = products ? products[0] : {};

  return (
    <>
      <VendorProductForm productDetails={productDetails} productId={params.id} />
    </>
  );
}
