"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";
import { useOrdersAnalytics } from "@/lib/data";

const config = {
  totalOrders: {
    label: "Total Orders",
    color: "#34d399",
  },
};

const OrderChart = ({}) => {
  const { ordersAnalytics, isLoading, error } = useOrdersAnalytics();
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  return (
    <ChartContainer config={config} className="max-h-[300px] bg-white">
      <BarChart data={ordersAnalytics} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
          className="text-gray-600"
        />
        <YAxis tickFormatter={value => `₹${value}`} className="text-gray-600" />
        <Tooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="totalOrders" fill={config.totalOrders.color} />
      </BarChart>
    </ChartContainer>
  );
};

export default OrderChart;
