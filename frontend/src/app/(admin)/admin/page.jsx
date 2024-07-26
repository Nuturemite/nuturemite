"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ShoppingCart, Users, DollarSign, CreditCard } from 'lucide-react';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} 

export default  function Component() {
  return (
   <div>
    <div>
      <div className="card flex gap-4 bg-white w-[240px]  p-4">
        <div>
          <ShoppingCart size={30} className="p-1 bg-green-400 text-white"/>
        </div>
        <div>
          <p>Orders</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-[400px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)"  />
          <Bar dataKey="mobile" fill="var(--color-mobile)"  />
        </BarChart>
      </ChartContainer>
   </div>
    )
}

const Card = ({ title, value, icon: Icon, color }) => {
  return (
    <div style={{ backgroundColor: color, padding: '20px', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h2>{title}</h2>
        <p>{value}</p>
      </div>
      <Icon size={48} />
    </div>
  );
};
