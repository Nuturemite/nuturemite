"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useVendorOrders } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Download, Edit, Eye } from "lucide-react";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import OrderStatus from "@/components/shared/admin/OrderStatus";
import DownloadInvoiceButton from "./download-invoice";

const OrderList = () => {
  const { orders, error, isLoading, mutate } = useVendorOrders({ limit: 50 });
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const columns = [
    {
      label: "Invoice ID",
      render: item => item._id,
    },
    {
      label: "Billed To",
      render: item => item.user.name,
    },
    {
      label: "Total ",
      render: item => `₹${item.total}`,
    },
    {
      label: "Invoice Date",
      render: item => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const actions = item => (
    <>
        <DownloadInvoiceButton id={item._id} />
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        actions={actions}
        caption="List of all orders."
        pending={pending}
      />
    </div>
  );
};

export default OrderList;
