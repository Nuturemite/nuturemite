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

function CategoryRow({ index, category, onDelete}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell className="line-clamp-1">
        {category.description ? category.description.slice(0, 40) : "No Description"}
      </TableCell>
      <TableCell>
        <form>
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
                    onClick={() => onDelete(category.id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link href={"/admin/category/edit/" + category.id + "/"}>
              <Edit className="text-green-500 cursor-pointer" />
            </Link>
          </div>
        </form>
      </TableCell>
    </TableRow>
  );
}

export default CategoryRow;
