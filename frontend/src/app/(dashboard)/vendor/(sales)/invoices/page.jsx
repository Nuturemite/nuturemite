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
const sampleInvoices = [
  {
    id: 1,
    invoiceId: "INV123456",
    orderId: "123456",
    invoiceDate: new Date(),
    totalAmount: 250,
    status: "Paid",
    billedTo: "John Doe",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
  {
    id: 2,
    invoiceId: "INV789012",
    orderId: "789012",
    invoiceDate: new Date(),
    totalAmount: 150,
    status: "Pending",
    billedTo: "Jane Smith",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)),
  },
];

const InvoicePage = () => {
  const [invoices] = useState(sampleInvoices); // Use API to fetch real data

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billed To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length ? (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoiceId}</TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>{invoice.invoiceDate.toLocaleDateString()}</TableCell>
                  <TableCell>&#8377; {invoice.totalAmount}</TableCell>
                  <TableCell>
                    <div
                      className={`text-xs p-1 rounded-full text-center ${
                        invoice.status === "Paid"
                          ? "bg-green-200 text-green-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell>{invoice.billedTo}</TableCell>
                  <TableCell>{invoice.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/invoices/${invoice.id}`}>
                      <Eye className="text-green-400 cursor-pointer" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8">No invoices found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoicePage;
