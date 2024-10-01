"use client";

import React from "react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

const BarChart = ({ data, config, label }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartContainer config={config} className="max-h-[300px] bg-white">
        <RechartsBarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={label}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
            className="text-gray-600"
          />
          <YAxis tickFormatter={value => `₹${value}`} className="text-gray-600" />
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {Object.entries(config).map(([key, value], index) => (
            <Bar dataKey={key} fill={value.color} key={index} />
          ))}
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChart;
