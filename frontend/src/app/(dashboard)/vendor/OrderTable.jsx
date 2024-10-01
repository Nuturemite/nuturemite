"use client";
import React, { useState } from "react";
import { useVendorOrders } from "@/lib/data";
import DashTable from "./DashTable";
import Error from "@/components/shared/error";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";

const OrderList = () => {
  const { orders, error, isLoading, mutate } = useVendorOrders({ limit: 50 });
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const columns = [
    {
      label: "Ordered By",
      render: item => item.user.name,
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


  return (
      <DashTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        caption="List of all orders."
        pending={pending}
      />
  );
};



export default OrderList;
