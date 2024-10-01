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
import { useSalesAnalytics } from "@/lib/data";

const config = {
  totalSales: {
    label: "Total Sales",
    color: "#34d399",
  },
};

const SalesChart = ({}) => {
  const { salesAnalytics, isLoading, error } = useSalesAnalytics();
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  return (
    <ChartContainer config={config} className="max-h-[300px] bg-white">
      <BarChart data={salesAnalytics} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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
        <Bar dataKey="totalSales" fill={config.totalSales.color} />
      </BarChart>
    </ChartContainer>
  );
};

export default SalesChart;
