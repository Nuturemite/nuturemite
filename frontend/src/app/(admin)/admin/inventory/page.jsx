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
import { Edit } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
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
import CustomSelect from "@/components/ui/custrom-select";

const StockUpdateDialog = ({ product, mutate }) => {
  const [pending, setPending] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const [stockStatus, setStockStatus] = useState(product.status);

  const handleStockUpdate = async id => {
    try {
      setPending(true);
      await api.put(`/vendor-products/${id}`, {
        quantity: quantity,
        status: stockStatus,
      });
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
          <form>
            <div className="my-4">
              <Label className="block mb-2">Inventory Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full border p-2"
              />
              <Label className="block mt-4 mb-2">Stock Status</Label>
              <CustomSelect
                value={stockStatus}
                onChange={v => setStockStatus(v)}
                className="w-full border p-2"
                placeholder={"Select"}
                options={[
                  { name: "In Stock", id: "In Stock" },
                  { name: "Out of Stock", id: "Out of Stock" },
                ]}
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
  const { products, error, isLoading, mutate } = useProducts({ limit: 1000 });

  if (error) return <Error />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Sales Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={6} />
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
                  <TableCell>&#8377;{product.price}</TableCell>
                  <TableCell>&#8377;{product.basePrice}</TableCell>
                  <TableCell>{product.quantity || 0}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <StockUpdateDialog product={product} mutate={mutate} />
                      <Link href={`/admin/product/edit/${product._id}/`}></Link>
                    </div>
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

export default ProductList;
