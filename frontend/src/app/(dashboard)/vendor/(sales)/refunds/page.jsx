"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";

// Sample data for demonstration
const sampleRefunds = [
  {
    id: 1,
    refundId: "REF123456",
    orderId: "123456",
    refundDate: new Date(),
    refundAmount: 100,
    status: "Processed",
    refundedTo: "John Doe",
    reason: "Product Defect",
  },
  {
    id: 2,
    refundId: "REF789012",
    orderId: "789012",
    refundDate: new Date(),
    refundAmount: 50,
    status: "Pending",
    refundedTo: "Jane Smith",
    reason: "Wrong Item Sent",
  },
];

const RefundPage = () => {
  const [refunds] = useState(sampleRefunds); // Use API to fetch real data

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all refunds.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Refund ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Refund Date</TableHead>
              <TableHead>Refund Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Refunded To</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refunds.length ? (
              refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell>{refund.refundId}</TableCell>
                  <TableCell>{refund.orderId}</TableCell>
                  <TableCell>{refund.refundDate.toLocaleDateString()}</TableCell>
                  <TableCell>&#8377; {refund.refundAmount}</TableCell>
                  <TableCell>
                    <div
                      className={`text-xs p-1 rounded-full text-center ${
                        refund.status === "Processed"
                          ? "bg-green-200 text-green-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {refund.status}
                    </div>
                  </TableCell>
                  <TableCell>{refund.refundedTo}</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>
                    <Link href={`/refunds/${refund.id}`}>
                      <Eye className="text-green-400 cursor-pointer" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8">No refunds found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RefundPage;
