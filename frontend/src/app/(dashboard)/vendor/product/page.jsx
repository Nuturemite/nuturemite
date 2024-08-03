"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useProducts } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

const ProductList = ({ searchParams }) => {
  const query = searchParams.query;
  const { products, error, isLoading, mutate } = useProducts({ limit: 50 });
  const [pending, setPending] = useState(false);

  const handleProductDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/products/${id}`);
      await mutate();
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
      <div className={`bg-white px-4 ${pending ? "opacity-50 pointer-events-none" : ""}`}>
        <Table>
          <TableCaption>List of all products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Sales Price</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={5} />
          ) : (
            <TableBody>
              {products.map(product => (
                <TableRow key={product._id}>
                  <TableCell className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 object-cover rounded"
                      src={product?.images[1] || "./noimage.png"}
                      alt="product image"
                    />
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>&#8377;{product.basePrice}</TableCell>
                  <TableCell>&#8377;{product.price}</TableCell>
                  <TableCell>{product.sku || "-"}</TableCell>
                  <TableCell>
                    <ProductDeleteDialog
                      key={product._id}
                      id={product._id}
                      handleProductDelete={handleProductDelete}
                      product={product}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

const ProductDeleteDialog = ({ handleProductDelete, product }) => {
  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash className="text-red-600 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleProductDelete(product._id)}
              className={buttonVariants({ variant: "destructive" })}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Link href={`/vendor/product/edit/${product._id}/`}>
        <Edit className="text-green-500 cursor-pointer" />
      </Link>
    </div>
  );
};
export default ProductList;
