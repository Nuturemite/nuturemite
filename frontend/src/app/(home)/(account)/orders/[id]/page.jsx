"use client";
import Error from "@/components/shared/common/error";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui";
import api from "@/lib/api";
import { useOrder } from "@/lib/data";
import { formatString, tst } from "@/lib/utils";
import { useState } from "react";

export default function OrderDetailsPage({ params }) {
  const { order, isLoading, error, mutate } = useOrder(params.id);
  const [pending, setPending] = useState(false);

  const handleCancelOrder = async () => {
    setPending(true);
    try {
      await api.put(`/orders/${order._id}`,{status:"cancelled"});
      mutate();
      tst.success("Order canceled successfully");
    } catch (error) {
      tst.error("Error canceling the order:", error.message);
    } finally {
      setPending(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="p-4 min-h-screen flex md:flex-row flex-col md:gap-10">
      {/* Order Items */}
      <div className="md:w-2/3">
        <h2 className="h4-primary">Order Products</h2>
        {order.suborders.map(suborder => (
          <div key={suborder._id} className="mb-8 bg-white p-4 border border-gray-300">
            <div className="grid grid-cols-2 mb-4 text-sm border-b border-gray-300 pb-4">
              <div>
                <h3 className="font-semibold">Vendor: {suborder.vendor.name}</h3>
                <p>Contact Name: {suborder.vendor.name}</p>
              </div>
              <div>
                <p>Contact Phone: {suborder.vendor.contactNumber}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${getStatusColor(formatString(suborder.status))}`}
                  >
                    {formatString(suborder.status)}
                  </span>
                </p>
              </div>
            </div>
            {suborder.orderItems.map(item => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 p-4 border border-gray-300"
              >
                <div className="flex items-center">
                  <div className="h-16 w-16 overflow-hidden border border-gray-200">
                    <img
                      src={item.product.images[0]}
                      className="h-full w-full object-cover object-center"
                      alt={item.product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-semibold mb-1">{item.product.name}</h3>
                    <p className="text-xs text-gray-700">Price: &#8377;{item.price}</p>
                    <p className="text-xs text-gray-700">Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Order Summary and Shipping Details */}
      <div className="md:w-1/3 space-y-6">
        <div className="bg-white p-4 border border-gray-300">
          <h2 className="h5-primary">Order Details</h2>
          <div className="text-gray-700">
            <p className="text-sm mb-2">
              Order ID: <span className="font-semibold">{order._id}</span>
            </p>
            <p className="text-sm mb-2">
              Order Status: <span className="font-semibold">{formatString(order.status)}</span>
            </p>
            <p className="text-sm mb-2">
              Order Date:{" "}
              <span className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm mb-2">
              Subtotal: <span className="font-semibold">&#8377;{order.subtotal}</span>
            </p>
            <p className="text-sm mb-2">
              Total: <span className="font-semibold">&#8377;{order.total}</span>
            </p>
            {/* Cancel Button */}
            {order.status === "pending" && (
              <Button variant="destructive" size={"sm"} onClick={handleCancelOrder} pending={pending}>
                {pending ? "Canceling..." : "Cancel Order"}
              </Button>
            )}
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-300">
          <h2 className="h5-primary">Shipping Details</h2>
          <div className="text-gray-700">
            <p className="text-sm mb-2">
              Email: <span className="font-semibold">{order.shippingDetails.email}</span>
            </p>
            <p className="text-sm mb-2">
              Phone: <span className="font-semibold">{order.shippingDetails.phone}</span>
            </p>
            <p className="text-sm mb-2">
              Address: <span className="font-semibold">{order.shippingDetails.address}</span>
            </p>
            <p className="text-sm mb-2">
              Country: <span className="font-semibold">{order.shippingDetails.country}</span>
            </p>
            <p className="text-sm mb-2">
              City: <span className="font-semibold">{order.shippingDetails.city}</span>
            </p>
            <p className="text-sm mb-2">
              State: <span className="font-semibold">{order.shippingDetails.state}</span>
            </p>
            <p className="text-sm mb-2">
              Zipcode: <span className="font-semibold">{order.shippingDetails.zipcode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to get status color
const getStatusColor = status => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Completed":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};
