"use client"
import React, { useState } from "react";
import BrandRow from "./row";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useBrands } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
const BrandList = ({ searchParams }) => {
  const query = searchParams.query;
  const { brands, error, isLoading, mutate } = useBrands({ query });
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
        <Link href="/admin/brand/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <div className="bg-white px-4">
        <div className={`bg-white px-4 ${pending ? 'opacity-50 pointer-events-none' : ''}`}>
          <Table>
            <TableCaption>List of all brands.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-max">Description</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton columnCount={4} />
            ) : (
              <TableBody>
                {brands.map((brand, index) => (
                  <BrandRow
                    key={brand.id}
                    index={index + 1}
                    brand={brand}
                    onDelete={handleBrandDelete}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BrandList;
