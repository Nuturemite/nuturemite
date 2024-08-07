"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import CustomSelect from "@/components/ui/custrom-select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { useOrder } from "@/lib/data";
import { formatString, tst } from "@/lib/utils";
import api from "@/lib/api";
import OrderStatus from "@/components/shared/admin/OrderStatus";

const OrderPage = ({ params }) => {
  const { order: orderData, error, isLoading } = useOrder(params.id);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 mb-10">
      <OrderHeader orderData={orderData} />
      <OrderItems items={orderData.orderItems} />
      <div className="flex gap-20">
        <ShippingAddressDetails shippingAddress={orderData.shippingAddress} />
        <Separator orientation="vertical" />
        <OrderDetails orderData={orderData} />
      </div>
    </div>
  );
};

const OrderHeader = ({ orderData }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="h4-primary">Order Details</h2>
        <p>
          <OrderStatus status={orderData.status} />
        </p>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-slate-600">Order ID:</span> {orderData._id}
        </p>
        <p className="text-sm">
          <span className="text-slate-600">Order Date:</span>{" "}
          {new Date(orderData.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const ShippingAddressDetails = ({ shippingAddress }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="h5-primary">Shipping Address</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span>Name:</span> {shippingAddress.fname + " " + shippingAddress.lname}
        </p>
        <p>
          <span>Address:</span> {shippingAddress.address}
        </p>
        <p>
          <span>City:</span> {shippingAddress.city}
        </p>
        <p>
          <span>State:</span> {shippingAddress.state}
        </p>
        <p>
          <span>Zip:</span> {shippingAddress.zipcode}
        </p>
        <p>
          <span>Country:</span> {shippingAddress.country}
        </p>
        <p>
          <span>Phone:</span> {shippingAddress.phone}
        </p>
      </div>
    </div>
  );
};

const OrderDetails = ({ orderData }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="h5-primary">Order Details</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span>Order Date:</span> {new Date(orderData.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span>Sub Total:</span> &#8377;{orderData.subTotal}
        </p>
        <p>
          <span>Total :</span> &#8377;{orderData.total}
        </p>
      </div>
    </div>
  );
};

const OrderItems = ({ items }) => {
  return (
    <div className="border-b pb-6 mb-6">
      <h2 className="h4-primary">Ordered Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item._id}>
              <TableCell className="flex gap-2 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover "
                />
                <span>{item.product.name}</span>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>&#8377;{item.unitPrice}</TableCell>
              <TableCell>&#8377;{item.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderPage;
