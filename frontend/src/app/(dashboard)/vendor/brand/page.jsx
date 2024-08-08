"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useBrands } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Edit, Plus, Trash } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";

const BrandList = ({ searchParams }) => {
  const { brands, error, isLoading, mutate } = useBrands({ query: searchParams.query });
  const [pending, setPending] = useState(false);

  const handleBrandDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/brands/${id}`);
      mutate(brands.filter(brand => brand.id !== id));
      tst.success("Brand deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  if (error) return <Error />;

  const columns = [
    // { key: 'id', label: 'ID', render: (item, index) => index + 1 },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description', render: item => item.description ? item.description.slice(0, 40) : "No Description" }
  ];

  const actions = item => (
    <div className="flex gap-2">
      <AlertBox onClick={() => handleBrandDelete(item.id)}>
        <Trash className="text-red-600 cursor-pointer" />
      </AlertBox>
      <Link href={`/vendor/category/edit/${item.id}`}>
        <Edit className="text-green-500 cursor-pointer" />
      </Link>
    </div>
  );


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
        <Link href="/vendor/brand/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={brands}
        isLoading={isLoading}
        actions={actions}
        caption="List of all brands."
        pending={pending}
      />
    </div>
  );
};

export default BrandList;
