"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import SearchInput from "@/components/shared/search";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useMyVendorOrders } from "@/lib/data";
import { isLastDayOfMonth } from "date-fns";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";

// Sample data for demonstration
const sampleData = [
  {
    id: 1,
    orderId: "123456",
    subtotal: 100,
    grandTotal: 110,
    orderDate: new Date(),
    status: "Pending",
    billedTo: "John Doe",
    shippedTo: "Jane Smith",
    paymentMethod: "Credit Card",
    shippingMethod: "Express",
  },
  {
    id: 2,
    orderId: "789012",
    subtotal: 200,
    grandTotal: 210,
    orderDate: new Date(),
    status: "Shipped",
    billedTo: "Jane Smith",
    shippedTo: "John Doe",
    paymentMethod: "PayPal",
    shippingMethod: "Standard",
  },
  {
    id: 3,
    orderId: "345678",
    subtotal: 300,
    grandTotal: 320,
    orderDate: new Date(),
    status: "Delivered",
    billedTo: "Alice Johnson",
    shippedTo: "Bob Brown",
    paymentMethod: "Bank Transfer",
    shippingMethod: "Next Day",
  },
  {
    id: 4,
    orderId: "901234",
    subtotal: 150,
    grandTotal: 160,
    orderDate: new Date(),
    status: "Cancelled",
    billedTo: "Charlie Davis",
    shippedTo: "Dana Lee",
    paymentMethod: "Credit Card",
    shippingMethod: "Two-Day",
  },
];

const ProductList = () => {
  // const { order, isLoading, error } = useMyVendorOrders();

  // if(isLoading) return <Loader/>
  // if(error) return <Error/>
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Grand Total</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billed To</TableHead>
              <TableHead>Shipped To</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Shipping Method</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>&#8377; {item.subtotal}</TableCell>
                <TableCell>&#8377; {item.grandTotal}</TableCell>
                <TableCell>{item.orderDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div
                    className={`text-xs p-1 rounded-full text-center ${
                      item.status === "Delivered"
                        ? "bg-green-200 text-green-600"
                        : item.status === "Shipped"
                        ? "bg-blue-200 text-blue-600"
                        : item.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {item.status}
                  </div>
                </TableCell>
                <TableCell>{item.billedTo}</TableCell>
                <TableCell>{item.shippedTo}</TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell>{item.shippingMethod}</TableCell>
                <TableCell>
                  <Link href={`/orders/${item.id}`}>
                    <Eye className="text-green-400 cursor-pointer" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
