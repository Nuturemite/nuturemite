import { formatString } from "@/lib/utils";
import React from "react";

const statusColor = {
  Pending: "bg-yellow-200 text-yellow-600", 
  Processing: "bg-gray-200 text-gray-600", 
  Picked: "bg-teal-200 text-teal-600", 
  Shipped: "bg-indigo-200 text-indigo-600", 
  "In Transit": "bg-blue-200 text-blue-600", 
  "Out For Delivery": "bg-orange-200 text-orange-600", 
  Delivered: "bg-green-200 text-green-600", 
  Cancelled: "bg-red-200 text-red-600", 
  Returned: "bg-purple-200 text-purple-600", 
};

export default function OrderStatus({ status }) {
  return (
    <span className={`rounded-xl px-4 py-1 whitespace-nowrap text-xs ${statusColor[formatString(status || "")]}`}>
      {formatString(status)}
    </span>
  );
}
