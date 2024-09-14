"use client";
import { Button } from "@/components/ui";
import React from "react";
import Link from "next/link";
import { useMyAddresses } from "@/lib/data";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const AddressCard = ({ address }) => {
  const handleRemoveAddress = async () => {
    try {
      await api.delete(`/addresses/${address._id}`);
    } catch (error) {
      console.log(error);
      tst.error(error);
    }
  };

  return (
    <div className="bg-white p-4 border  flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">{`${address.fname} ${address.lname}`}</h2>
        <div className="gap-2 flex">
          <Link variant="outline" href={`/address/edit/${address._id}`}>
            <Button>Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleRemoveAddress}>
            Remove
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{address.email}</p>
      <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
      <p className="text-sm text-gray-600 mb-1">{`${address.city}, ${address.state} ${address.zipcode}`}</p>
    </div>
  );
};

const AddressPage = () => {
  const { addresses, isLoading } = useMyAddresses();
  if (isLoading) return;

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
