"use client";
import Error from "@/components/shared/common/error";
import Loader from "@/components/shared/loader";
import { useOrder } from "@/lib/data";

export default function OrderDetailsPage({ params }) {
  const { order, isLoading, error } = useOrder(params.id);
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex p-2 min-h-screen gap-10">
      {/* Order Items */}
      <div className="w-2/3">
        <h2 className="h3-primary">Order Products</h2>
        {order.suborders.map(suborder => (
          <div key={suborder._id} className="mb-8 bg-white max-w-3xl p-4">
          <div className="grid grid-cols-2 mb-8 text-sm">
            <div>
                <h3 className="h4-primary text-blue-700">Vendor: {suborder.vendor.details.displayName}</h3>
                <p>Contact Name: {suborder.vendor.details.name}</p>
            </div>
              <div>
                <p>Contact Phone: {suborder.vendor.details.phone}</p>
                <p>Status: <span className="text-red-600">{suborder.status}</span></p>
              </div>
          </div>
            {suborder.orderItems.map(item => (
              <div
                key={item._id}
                className="flex items-center justify-between w-full  mb-4 bg-white"
              >
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-gray-200">
                    <img
                      src={item.product.images[0]}
                      className="h-full w-full object-cover object-center"
                      alt={item.product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-gray-900">
                      <h3 className="mb-2 text-sm">{item.product.name}</h3>
                      <p className="text-xs text-gray-700">Price: &#8377;{item.price}</p>
                      <p className="text-xs text-gray-700">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Order Summary and Shipping Details */}
      <div className="w-1/3 space-y-6">
        <div>
          <h2 className="h3-primary">Order Details</h2>
          <div className="w-full max-w-3xl p-6 bg-white">
            <div className="text-gray-700">
              <p className="text-sm mb-2">Order ID: {order._id}</p>
              <p className="text-sm mb-2">Order Status: {order.status}</p>
              <p className="text-sm mb-2">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm mb-2">Subtotal: &#8377;{order.subtotal}</p>
              <p className="text-sm mb-2">Total: &#8377;{order.total}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="h3-primary">Shipping Details</h2>
          <div className="w-full max-w-3xl p-6 bg-white">
            <div className="text-gray-700">
              <p className="text-sm mb-2">Email: {order.shippingDetails.email}</p>
              <p className="text-sm mb-2">Phone: {order.shippingDetails.phone}</p>
              <p className="text-sm mb-2">Address: {order.shippingDetails.address}</p>
              <p className="text-sm mb-2">Country: {order.shippingDetails.country}</p>
              <p className="text-sm mb-2">City: {order.shippingDetails.city}</p>
              <p className="text-sm mb-2">State: {order.shippingDetails.state}</p>
              <p className="text-sm mb-2">Zipcode: {order.shippingDetails.zipcode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
