"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useVendorOrders } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { cn, formatString, tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Edit, Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { Label } from "@/components/ui";
import { Input } from "@/components/ui";
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
import OrderStatus from "@/components/shared/admin/OrderStatus";
import { AlertBox } from "@/components/ui/alert-dialog";

const OrderList = () => {
  const { orders,error, isLoading, mutate } = useVendorOrders({ limit: 50 });
  const [pending, setPending] = useState(false);

  if (error) return <Error />;

  const columns = [
    {
      label: "Order ID",
      render: item => item._id,
    },
    {
      label: "Ordered By",
      render: item => item.user.name,
      className: "whitespace-nowrap",
    },
    {
      label: "Address",
      render: item => (
        <span className=" line-clamp-2">{`${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.state}, ${item.shippingAddress.zipcode}`}</span>
      ),
    },
    {
      label: "Total ",
      render: item => `₹${item.total}`,
    },
    {
      label: "Status",
      render: item => <OrderStatus status={item.status} />,
    },
    {
      label: "Date",
      render: item => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      label: "Payment Status",
      render: item => (
        <div
          className={cn(
            "rounded-full px-2 py-1 text-xs text-center",
            item.paymentStatus === "pending"
              ? "bg-red-200 text-red-600"
              : "bg-green-200 text-green-600"
          )}
        >
          {formatString(item.paymentStatus)}
        </div>
      ),
    },
    {
      label: "Payment Mode",
      render: item => (
        <div
          className={cn(
            "rounded-full px-2 py-1 text-xs text-center",
            item.paymentMode === "cod"
              ? "bg-orange-200 text-orange-600"
              : "bg-green-200 text-green-600"
          )}
        >
          {formatString(item.paymentMode)}
        </div>
      ),
    },
  ];

  const actions = item => (
    <>
      {/* {item.status === "pending" && <ShipmentDialog orderId={item._id} />} */}
      {item.status === "pending" && (
        <AlertBox
          title={"Confirm Order"}
          btnName={"Confirm"}
          onClick={() => handleConfirmOrder(item._id)}
          className="text-red-500"
        >
          <Button size="xs">Confirm</Button>
        </AlertBox>
      )}
      <Link href={`/vendor/orders/edit/${item._id}/`}>
        <Eye className="text-green-500" />
      </Link>
    </>
  );

  const handleConfirmOrder = async orderId => {
    try {
      setPending(true);
      await api.post(`/orders/${orderId}/confirm`);
      mutate();
      tst.success("Order confirmed successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        actions={actions}
        caption="List of all orders."
        pending={pending}
        rowPerPage={40}
      />
    </div>
  );
};

const ShipmentDialog = ({ orderId }) => {
  const [pending, setPending] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [carrier, setCarrier] = useState("");

  const handleShipment = async () => {
    try {
      setPending(true);
      await api.post("/shipments", { orderId, trackingId, carrier });
      tst.success("Shipment created successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Shipment Details</DialogTitle>
            <DialogDescription>Enter tracking ID and carrier for the shipment.</DialogDescription>
          </DialogHeader>
          <form onSubmit={e => e.preventDefault()}>
            <div className="my-4 grid grid-cols-4">
              <Label className="">Tracking ID</Label>
              <Input
                type="text"
                value={trackingId}
                onChange={e => setTrackingId(e.target.value)}
                className="col-span-3 "
              />
            </div>
            <div className="my-4 grid grid-cols-4">
              <Label className="">Carrier</Label>
              <Input
                type="text"
                value={carrier}
                onChange={e => setCarrier(e.target.value)}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button pending={pending} type="submit" onClick={handleShipment}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default OrderList;
