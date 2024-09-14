"use client";
import AddressForm from "@/components/forms/AddressForm";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useAddress } from "@/lib/data";
import React from "react";

export default function page({ params }) {
  const { address, isLoading, error } = useAddress(params.id);
  
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  
  return <AddressForm update address={address} />;
}
