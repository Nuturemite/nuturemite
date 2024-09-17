"use client";
import { Button } from "@/components/ui";
import React from "react";
import Link from "next/link";
import { useMyAddresses } from "@/lib/data";
import AddressCard from "./AddressCard";
import Loader from "@/components/shared/loader";

const AddressPage = () => {
  const { addresses, isLoading } = useMyAddresses();
  if (isLoading) return <Loader />; 
  console.log(addresses);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6 flex justify-between items-center">
        <h2 className="h2-primary">Address</h2>
        <Link href="/address/new">
          <Button>Add New Address</Button>
        </Link>
      </header>
      <div className="space-y-4">
        {addresses.map(address => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
};

export default AddressPage;
