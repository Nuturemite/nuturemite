// ProductList.jsx
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
import SearchInput from "@/components/shared/search";
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
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthContext } from "@/context/authprovider";
import SelectProduct from "./SelectProduct";

const ProductList = ({}) => {
  const { user } = useAuthContext();
  const { products, error, isLoading, mutate } = useProducts({ vendorId: user.id });
  const [pending, setPending] = useState(false);

  const handleProductDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/products/${id}`);
      mutate(products.filter(product => product.id !== id));
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[80vh] overflow-y-scroll">
            <SelectProduct />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white px-4">
        <div className={`${pending ? "opacity-50 pointer-events-none" : ""}`}>
          <Table>
            <TableCaption>List of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableSkeleton columnCount={5} />
            ) : (
              <TableBody>
                {products.map(product => (
                  <TableRow>
                    <TableCell className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 object-cover "
                        src={product?.images[1] || "./noimage.png"}
                        alt="product image"
                      />
                      <span>{product.name}</span>
                    </TableCell>
                    <TableCell>&#8377;{product.basePrice}</TableCell>
                    <TableCell>&#8377;{product.price}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>
                      <form>
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Trash className="text-red-600 cursor-pointer" />
                              </AlertDialogTrigger>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleProductDelete(product.id)}
                                  className={buttonVariants({ variant: "destructive" })}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Link href={`/vendor/product/edit/${product._id}`}>
                            <Edit className="text-green-500 cursor-pointer" />
                          </Link>
                        </div>
                      </form>
                    </TableCell>
                  </TableRow>
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
