"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useBlogs } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";

const BlogList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
  };
  const { blogs, error, isLoading, mutate } = useBlogs({ limit: 50, ...filters });
  const [pending, setPending] = useState(false);

  const handleBlogDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/blogs/${id}`);
      await mutate();
      tst.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  if (error) return <Error />;

  const columns = [
    {
      key: "title",
      label: "Title",
      render: item => <span className="truncate w-60">{item.title}</span>,
    },
    {
      key: "desc",
      label: "Description",
      render: item => <span className="truncate w-60">{item.desc}</span>,
    },
    {
      key: "tags",
      label: "Tags",
      render: item => <span className="truncate w-60">{item.tags.join(" ")}</span>,
    },
    {
      key: "date",
      label: "Date",
      render: item => <span>{new Date(item.createdAt).toLocaleDateString()}</span>,
    },
  ];

  const actions = item => (
    <>
      <Link href={`/admin/blogs/edit/${item.slug}/`}>
        <Edit className="text-green-500" />
      </Link>
      <AlertBox onClick={() => handleBlogDelete(item._id)}>
        <Trash className="text-red-600" />
      </AlertBox>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={blogs}
        isLoading={isLoading}
        actions={actions}
        caption="List of all blogs."
        pending={pending}
      />
      <OutLoader loading={pending} />
    </div>
  );
};

export default BlogList;
