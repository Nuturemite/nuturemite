"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useCategories } from "@/lib/data";
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
import { Plus, Trash, Edit } from "lucide-react";
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

const CategoryList = ({ searchParams }) => {
  const query = searchParams.query;
  const { categories, error, isLoading, mutate } = useCategories({ query });
  const [pending, setPending] = useState(false);

  const handleCategoryDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/categories/${id}`);
      mutate(categories.filter(category => category.id !== id));
      tst.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
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
          <SearchInput className={"md:w-60"} />
        </div>
        <Link href={"/admin/category/new"}>
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <div className="bg-white px-4">
        <div className={`bg-white px-4 ${pending ? 'opacity-50 pointer-events-none' : ''}`}>
          <Table>
            <TableCaption>List of all categories.</TableCaption>
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
                {categories.map((cat, index) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="line-clamp-1">
                      {cat.description ? cat.description.slice(0, 40) : "No Description"}
                    </TableCell>
                    <TableCell>
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
                                onClick={() => handleCategoryDelete(cat._id)}
                                className="bg-red-600 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Link href={`/admin/category/edit/${cat._id}`}>
                          <Edit className="text-green-500 cursor-pointer" />
                        </Link>
                      </div>
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

export default CategoryList;
