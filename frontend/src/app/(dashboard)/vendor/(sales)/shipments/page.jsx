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
const sampleShipments = [
  {
    id: 1,
    shipmentId: "SHIP123456",
    orderId: "123456",
    shipmentDate: new Date(),
    carrier: "FedEx",
    status: "In Transit",
    shippedTo: "Jane Smith",
    trackingNumber: "TRACK123456",
  },
  {
    id: 2,
    shipmentId: "SHIP789012",
    orderId: "789012",
    shipmentDate: new Date(),
    carrier: "UPS",
    status: "Delivered",
    shippedTo: "John Doe",
    trackingNumber: "TRACK789012",
  },
];

const ShipmentPage = () => {
  const [shipments] = useState(sampleShipments); // Use API to fetch real data

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white px-4">
        <Table>
          <TableCaption>List of all shipments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Shipment Date</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipped To</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.length ? (
              shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.shipmentId}</TableCell>
                  <TableCell>{shipment.orderId}</TableCell>
                  <TableCell>{shipment.shipmentDate.toLocaleDateString()}</TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>
                    <div
                      className={`text-xs p-1 rounded-full text-center ${
                        shipment.status === "Delivered"
                          ? "bg-green-200 text-green-600"
                          : "bg-yellow-200 text-yellow-600"
                      }`}
                    >
                      {shipment.status}
                    </div>
                  </TableCell>
                  <TableCell>{shipment.shippedTo}</TableCell>
                  <TableCell>{shipment.trackingNumber}</TableCell>
                  <TableCell>
                    <Link href={`/shipments/${shipment.id}`}>
                      <Eye className="text-green-400 cursor-pointer" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8">No shipments found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShipmentPage;
