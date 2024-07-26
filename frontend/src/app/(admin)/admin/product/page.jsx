// ProductList.jsx
"use client"
import React, { useState } from "react";
import ProductRow from "./row";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useBaseProducts, useProducts } from "@/lib/data";
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

const ProductList = ({ searchParams }) => {
  const query = searchParams.query;
  const { products, error, isLoading, mutate } = useBaseProducts();
  const [pending, setPending] = useState(false);

  const handleProductDelete = async (id) => {
    try {
      setPending(true);
      await api.delete(`/products/${id}`);
      mutate(products.filter((product) => product.id !== id));
      tst.success("Product deleted successfully");
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
        <Link href="/admin/product/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <div className="bg-white px-4">
        <div className={`bg-white px-4 ${pending ? 'opacity-50 pointer-events-none' : ''}`}>
          <Table>
            <TableCaption>List of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton columnCount={6} />
            ) : (
              <TableBody>
                {products.map((product, index) => (
                  <ProductRow
                    key={product.id}
                    index={index + 1}
                    product={product}
                    onDelete={handleProductDelete}
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

export default ProductList;
