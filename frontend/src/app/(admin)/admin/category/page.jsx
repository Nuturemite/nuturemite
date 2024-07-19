"use client";
import React, { useState } from "react";
import CategoryRow from "./row";
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
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/tableskeleton";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
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
                  <CategoryRow
                    index={index + 1}
                    key={cat.id}
                    category={cat}
                    onDelete={handleCategoryDelete}
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

export default CategoryList;


// "use client";
// import React from "react";
// import { useCategories } from "@/lib/data";
// import CommonList from "@/components/shared/admin/CommonList";
// import { TableCell } from "@/components/ui/table";

// const CategoryList = ({ searchParams }) => {
//   const queryParams = searchParams.query;
//   const { data: categories, error, isLoading, mutate } = useCategories({ query: queryParams });

//   const mapCategoryToTableRows = (category) => (
//     <>
//       <TableCell>{category.id}</TableCell>
//       <TableCell>{category.name}</TableCell>
//       <TableCell>{category.description || "No Description"}</TableCell>
//     </>
//   );

//   return (
//     <CommonList
//       searchEndpoint="category"
//       newEntityLink="/admin/category/new"
//       deleteEndpoint="/categories"
//       data={categories}
//       error={error}
//       isLoading={isLoading}
//       mapFunction={mapCategoryToTableRows}
//       tableCaption="List of all categories."
//       tableHeaders={["ID", "Name", "Description"]}
//       refetch={mutate}
//     />
//   );
// };

// export default CategoryList;
