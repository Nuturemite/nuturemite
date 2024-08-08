"use client";
import React, { useState } from "react";
import { useMyOrders } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import Error from "@/components/shared/error";
import { Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import OrderStatus from "@/components/shared/admin/OrderStatus";
import Loader from "@/components/shared/loader";

const OrderList = () => {
  const { orders, error, isLoading} = useMyOrders({ limit: 50 });

  if(isLoading) return <Loader />
  if (error) return <Error />;

  const columns = [
    {
      label: "Order ID",
      render: item => item._id,
    },
    {
      label: "Status",
      render: item => <OrderStatus status={item.status} />,
    },
    {
      label: "Total ",
      render: item => `₹${item.total}`,
    },
    {
      label: "Date",
      render: item => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const actions = item => (
    <>
      <Link href={`/orders/${item._id}/`}>
        <Eye className="text-green-500" />
      </Link>
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
      />
    </div>
  );
};

export default OrderList;
