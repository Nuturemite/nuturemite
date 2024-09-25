"use client";
import React, { useState } from "react";
import api from "@/lib/api";
import { useProducts } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { Edit } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Button } from "@/components/ui";
import { IMAGE_URL } from "@/constants";

const StockUpdateDialog = ({ product, mutate }) => {
  const [pending, setPending] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleStockUpdate = async productId => {
    try {
      setPending(true);
      await api.put(`/products/${productId}`, { quantity });
      mutate();
      tst.success("Stock updated successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>
              Update the stock quantity and status for this product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={e => e.preventDefault()}>
            <div className="my-4">
              <Label className="block mb-2">Inventory Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full border p-2"
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button
                pending={pending}
                type="submit"
                onClick={() => handleStockUpdate(product._id)}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const ProductList = ({ searchParams }) => {
  const query = searchParams.query;
  const { products, error, isLoading, mutate } = useProducts({ limit: 1000, active: true });

  if (error) return <Error />;

  // Define columns and their data keys
  const columns = [
    {
      key: "name",
      label: "Name",
      render: product => (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 object-cover rounded"
            src={`${IMAGE_URL}/${product?.images[0] || "./noimage.png"}`}
            alt="product image"
          />
          <span className="truncate w-60">{product.name}</span>
        </div>
      ),
    },
    { key: "mrp", label: "MRP", render: product => `₹${product.mrp}` },
    { key: "price", label: "SP", render: product => `₹${product.price}` },
    { key: "quantity", label: "Quantity", render: product => product.quantity || 0 },
    { key: "sku", label: "SKU", render: item => item.sku || "-", className: "whitespace-nowrap" },
    {
      key: "status",
      label: "Status",
      render: product => (
        <div
          className={`py-1 rounded-full w-max text-xs px-2 text-center ${
            product.quantity === 0 ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"
          }`}
        >
          {product.quantity === 0 ? "Out of Stock" : "In Stock"}
        </div>
      ),
    },
  ];

  const actions = item => (
    <>
      <StockUpdateDialog product={item} mutate={mutate} />
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
      </div>
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        caption="List of all products."
        actions={actions}
      />
    </div>
  );
};

export default ProductList;
