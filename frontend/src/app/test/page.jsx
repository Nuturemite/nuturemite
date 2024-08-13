"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useProducts } from "@/lib/data";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import { Switch } from "@mui/material";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ProductList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
  };

  const { products, error, isLoading, mutate } = useProducts({ limit: 50, ...filters });
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

  const handleStatus = async (id, active) => {
    try {
      setPending(true);
      await api.put(`/products/${id}`, { active: !active });
      await mutate();
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
      headerName: "Name",
      field: "name",
      cellRendererFramework: (params) => (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 object-cover rounded"
            src={params.data.images[1] || "./noimage.png"}
            alt="product image"
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      headerName: "MRP",
      field: "basePrice",
      valueFormatter: (params) => `₹${params.value}`,
    },
    {
      headerName: "SP",
      field: "price",
      valueFormatter: (params) => `₹${params.value}`,
    },
    {
      headerName: "Category",
      field: "category",
      valueGetter: (params) => params.data.categories.map(cat => cat.name).join(" • ") || "-",
    },
    {
      headerName: "Active",
      field: "active",
      cellRenderer: (params) => (
        <Switch
          onChange={() => handleStatus(params.data._id, params.data.active)}
          checked={params.value}
        />
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <AlertBox onClick={() => handleProductDelete(params.data._id)}>
            <Trash className="text-red-600" />
          </AlertBox>
          <Link href={`/vendor/product/edit/${params.data._id}/`}>
            <Edit className="text-green-500" />
          </Link>
        </div>
      ),
    },
  ];

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
      <div className={`ag-theme-alpine ${pending ? "opacity-50 pointer-events-none" : ""}`} style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={products}
          columnDefs={columns}
          domLayout="autoHeight"
          loadingOverlayComponent={() => isLoading && <div>Loading...</div>}
        />
      </div>
      <OutLoader loading={pending} />
    </div>
  );
};

export default ProductList;
