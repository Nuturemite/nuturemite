"use client";
import { useProduct } from "@/lib/data";
import React from "react";
import VendorProductForm from "../../form";

export default function Page({ params }) {
  const id = params.id;
  const vendorProductData = useProduct(id);
  return (
    <>
      <VendorProductForm vendorProductId={id} update vendorProductData={vendorProductData} />
    </>
  );
}
