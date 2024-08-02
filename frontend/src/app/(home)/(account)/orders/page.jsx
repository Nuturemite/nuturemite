"use client";
import { useMyOrders } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import Error from "@/components/shared/common/error";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/shared/tableskeleton";
import Loader from "@/components/shared/loader";
import { Eye } from "lucide-react";

export default function OrderPage() {
  const { orders, isLoading, error } = useMyOrders();

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <h2 className="h2-primary">Orders</h2>
      <Table className="bg-white">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Grand Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={5} />
        ) : (
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  <div
                    className={`text-xs p-1 rounded-full text-center ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-600"
                        : order.status === "Shipped"
                        ? "bg-blue-200 text-blue-600"
                        : order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {order.status}
                  </div>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.subtotal}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link href={`/orders/${order._id}`}>
                    <Eye className="text-green-400 cursor-pointer" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
