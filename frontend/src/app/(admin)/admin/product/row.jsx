"use client";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

function ProductRow({ product, onDelete }) {
  return (
    <TableRow>
      <TableCell className="flex items-center gap-3">
        <img
          className="w-10 h-10 object-cover rounded"
          src={product?.images[1] || "./noimage.png"}
          alt="product image"
        />
        <span>{product.name}</span>
      </TableCell>
      <TableCell>&#8377;{product.basePrice}</TableCell>
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
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(product.id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link href={"/admin/product/edit/" + product.id + "/"}>
              <Edit className="text-green-500 cursor-pointer" />
            </Link>
          </div>
        </form>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
