"use client";
import React, { useState } from "react";
import { useRevenuePerUser } from "@/lib/data";
import DashTable from "./DashTable";
import Error from "@/components/shared/error";

const RevPerUserTable = () => {
  const { revenuePerUser, error, isLoading, mutate } = useRevenuePerUser();
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const columns = [
    {
      label: "User",
      render: item => item.user.name,
    },
    {
      label: "Total Revenue",
      render: item => `₹${item.totalRevenue}`,
    },
    {
      label: "Total Orders",
      render: item => item.totalOrders,
    },
  ];


  return (
      <DashTable
        columns={columns}
        data={revenuePerUser}
        isLoading={isLoading}
        caption="List of all orders."
        pending={pending}
      />
  );
};

export default RevPerUserTable;
