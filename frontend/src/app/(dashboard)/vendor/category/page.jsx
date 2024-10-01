"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useCategories } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Trash, Edit } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import { Switch } from "@mui/material";

const CategoryList = ({ searchParams }) => {
  const { categories, error, isLoading, mutate } = useCategories(true);
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

  const handleCategoryStatus = async (id, status) => {
    try {
      setPending(true);
      await api.put(`/categories/${id}`, { active: status });
      mutate(categories.map(category => category.id === id ? { ...category, active: status } : category));
      tst.success("Category status updated successfully");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  if (error) return <Error />;

  const columns = [
    // { key: "id", label: "ID", render: (item, index) => item._id},
    { key: "name", label: "Name" },
    {
      key: "description",
      label: "Description",
      render: item => (item.description ? item.description.slice(0, 40) : "No Description"),
    },
    {
      key: "active",
      label: "Status",
      render: item => (
        <Switch checked={item.active} onChange={() => handleCategoryStatus(item._id, !item.active)} />
      ),
    },
  ];

  const actions = item => (
    <div className="flex gap-2">
      <AlertBox onClick={() => handleCategoryDelete(item._id)}>
        <Trash className="text-red-600 cursor-pointer" />
      </AlertBox>
      <Link href={`/vendor/category/edit/${item._id}`}>
        <Edit className="text-green-500 cursor-pointer" />
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <SearchInput className="md:w-60" />
        <Link href="/vendor/category/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={categories}
        isLoading={isLoading}
        actions={actions}
        caption="List of all categories."
        pending={pending}
      />
    </div>
  );
};

export default CategoryList;
