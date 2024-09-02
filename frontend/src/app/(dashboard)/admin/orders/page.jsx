"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAllOrders, useVendorOrders } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Edit, Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import OrderStatus from "@/components/shared/admin/OrderStatus";

const OrderList = () => {
  const { orders, error, isLoading, mutate } = useAllOrders({ limit: 50 });
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const columns = [
    {
      label: "Order ID",
      render: item => item._id,
    },
    {
      label: "Ordered By",
      render: item => item.user.name,
    },
    {
      label:"Vendor",
      render: item => item.vendor?.name
    },
    {
      label: "Address",
      render: item => (
        <span>{`${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.state}, ${item.shippingAddress.zipcode}`}</span>
      ),
    },
    {
      label: "Total ",
      render: item => `₹${item.total}`,
    },
    {
      label: "Status",
      render: item => <OrderStatus status={item.status} />,
    },
    {
      label: "Date",
      render: item => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const actions = item => (
    <>
      <Link href={`/vendor/orders/edit/${item._id}/`}>
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
        pending={pending}
      />
    </div>
  );
};



export default OrderList;
