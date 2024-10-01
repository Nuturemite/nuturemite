"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui";
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
import api from "@/lib/api";
import OrderStatus from "@/components/shared/admin/OrderStatus";
import { AlertBox } from "../ui/alert-dialog";
import OutLoader from "../ui/outloader";
import RefundForm from "../forms/RefundForm";
import {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { tst } from "@/lib/utils";
import { downloadInvoice } from "@/lib/utils";
import DownloadInvoiceButton from "@/app/(dashboard)/vendor/(sales)/invoices/download-invoice";
import { IMAGE_URL } from "@/constants";

const OrderPage = ({ params, isAdmin = false, isUser = false }) => {
  const { order: orderData, error, isLoading } = useOrder(params.id);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-200 mb-10">
      <OrderHeader orderData={orderData} isAdmin={isAdmin} isUser={isUser} />
      <OrderItems items={orderData.orderItems} />
      <div className="flex flex-col md:flex-row gap-10 justify-between">
        <ShippingAddressDetails shippingAddress={orderData.shippingAddress} />
        <OrderDetails orderData={orderData} />
      </div>
    </div>
  );
};

const OrderHeader = ({ orderData, isUser, isAdmin }) => {
  const [pending, setPending] = useState();

  const handleOrderCancel = () => {
    try {
      setPending(true);
      api.post(`/orders/${orderData._id}/cancel`);
    } catch (error) {
      tst.error(error);
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="h4-primary">Order Details</h2>
        <div className="flex flex-col gap-4 ">
          <OrderStatus status={orderData.status} />
          {isAdmin && orderData.paymentStatus != "refunded" && orderData.status == "delivered" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"destructive"} size="xs">
                  Refund
                </Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refund Money</DialogTitle>
                    <DialogDescription>Refund the money to the customer.</DialogDescription>
                  </DialogHeader>
                  <RefundForm
                    order={orderData}
                    orderId={orderData._id}
                    onClose={() => setPending(false)}
                  />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          )}
          {isUser && orderData.status !== "delivered" && orderData.status !== "cancelled" && (
            <AlertBox
              btnName={"Yes"}
              desc={"Are you sure you want to cancel the Order"}
              onClick={() => handleOrderCancel(orderData._id)}
            >
              <Button variant={"destructive"} size="xs">
                Cancel
              </Button>
            </AlertBox>
          )}
          <DownloadInvoiceButton id={orderData._id} isChild={true}>
            <Button variant={"outline"} size="xs">
              Download Invoice
            </Button>
          </DownloadInvoiceButton>
        </div>
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
      <OutLoader loading={pending} />
    </div>
  );
};

const ShippingAddressDetails = ({ shippingAddress }) => {
  return (
    <div>
      <h2 className="h5-primary">Shipping Address</h2>
      <Table>
        <TableBody>
          {[
            { name: "Address", value: shippingAddress.address },
            { name: "City", value: shippingAddress.city },
            { name: "State", value: shippingAddress.state },
            { name: "Country", value: shippingAddress.country },
            { name: "Zip", value: shippingAddress.zipcode },
          ].map((item, index) => (
            <TableRow key={index} className="py-0">
              <TableCell className="text-sm py-1">{item.name}</TableCell>
              <TableCell className="text-sm py-1">{item.value || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const OrderDetails = ({ orderData }) => {
  return (
    <div>
      <h2 className="h5-primary">Order Details</h2>
      <Table>
        <TableBody>
          {[
            { name: "Order Date", value: new Date(orderData.createdAt).toLocaleDateString() },
            { name: "Total MRP", value: orderData.subTotal },
            { name: "Discount", value: orderData.discount },
            { name: "Delivery charges", value: orderData.delCharges || 0 },
            { name: "Total Price", value: orderData.total },
          ].map((item, index) => (
            <TableRow key={index} className="py-0">
              <TableCell className="text-sm py-1 whitespace-nowrap">{item.name}</TableCell>
              <TableCell className="text-sm py-1">{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
                  src={`${IMAGE_URL}/${item.product.images[0]}`}
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
