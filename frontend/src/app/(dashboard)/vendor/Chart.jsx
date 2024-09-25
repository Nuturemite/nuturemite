"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ShoppingCart, Users, DollarSign, CreditCard } from "lucide-react";
import { useAnalytics } from "@/lib/data";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";

const salesData = [
  { month: "January", totalSales: 5000 },
  { month: "February", totalSales: 7000 },
  { month: "March", totalSales: 6000 },
  { month: "April", totalSales: 8000 },
  { month: "May", totalSales: 7500 },
  { month: "June", totalSales: 9000 },
];

const ordersData = [
  { month: "January", totalOrders: 120 },
  { month: "February", totalOrders: 150 },
  { month: "March", totalOrders: 135 },
  { month: "April", totalOrders: 160 },
  { month: "May", totalOrders: 140 },
  { month: "June", totalOrders: 180 },
];

const salesConfig = {
  totalSales: {
    label: "Total Sales",
    color: "#34d399",
  },
};

const ordersConfig = {
  totalOrders: {
    label: "Total Orders",
    color: "#f87171",
  },
};

const Chart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartContainer config={salesConfig} className="max-h-[300px] bg-white">
        <BarChart data={salesData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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
          <Bar dataKey="totalSales" fill={salesConfig.totalSales.color} />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={ordersConfig} className="max-h-[300px] bg-white">
        <BarChart data={ordersData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
            className="text-gray-600"
          />
          <YAxis className="text-gray-600" />
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalOrders" fill={ordersConfig.totalOrders.color} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
