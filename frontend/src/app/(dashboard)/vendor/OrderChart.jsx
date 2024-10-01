"use client";

import React from "react";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { useOrdersAnalytics } from "@/lib/data";
import BarChart from "./BarChart";

const OrderChart = ({}) => {
  const { ordersAnalytics, isLoading, error } = useOrdersAnalytics();
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const orderConfig = {
    totalOrders: {
      label: "Total Orders",
      color: "#34d399",
    },
  };
  
  return (
    <BarChart data={ordersAnalytics} config={orderConfig} label="month" />
  );
};

export default OrderChart;
