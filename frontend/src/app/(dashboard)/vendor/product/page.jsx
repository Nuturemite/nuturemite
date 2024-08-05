"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useProducts } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";

const ProductList = () => {
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

  const columns = [
    {
      key: "name",
      label: "Name",
      render: item => (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 object-cover rounded"
            src={item.images[1] || "./noimage.png"}
            alt="product image"
          />
          <span>{item.name}</span>
        </div>
      ),
    },
    { key: "basePrice", label: "MRP", render: item => `₹${item.basePrice}` },
    { key: "price", label: "Sales Price", render: item => `₹${item.price}` },
    // { key: "status", label: "Status", render: item => `${item.status}` },
    // { key: "quantity", label: "Quantity", render: item => item.quantity || 0 },
    { key: "category", label: "Category", render: item => item.categories.map(cat => cat.name).join(" • ") || "-" },
    { key: "sku", label: "SKU", render: item => item.sku || "-" },
  ];

  const actions = item => (
    <>
      <AlertBox onClick={() => handleProductDelete(item._id)}>
        <Trash className="text-red-600" />
      </AlertBox>
      <Link href={`/vendor/product/edit/${item._id}/`}>
        <Edit className="text-green-500" />
      </Link>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
        <Link href="/vendor/product/new">
          <Button>
            <Plus className="mr-4" />
            Add New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        actions={actions}
        caption="List of all products."
        pending={pending}
      />
    </div>
  );
};

export default ProductList;
