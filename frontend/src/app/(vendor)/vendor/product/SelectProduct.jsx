"use client";
import { useBaseProducts } from "@/lib/data";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Error from "@/components/shared/error";
import TableSkeleton from "@/components/shared/tableskeleton";
import Link from "next/link";

export default function SelectProduct() {
  const { products, error, isLoading, mutate } = useBaseProducts();

  if (error) return <Error />;

  return (
    <div className="w-full">
      <Table>
        <TableCaption>List of all products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={6} />
        ) : (
          products.map(product => (
            <Link href={`/vendor/product/add/${product._id}`}>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 object-cover rounded"
                      src={product?.images[1] || "./noimage.png"}
                      alt="product image"
                    />
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>{product.basePrice}</TableCell>
                </TableRow>
              </TableBody>
            </Link>
          ))
        )}
      </Table>
    </div>
  );
}
