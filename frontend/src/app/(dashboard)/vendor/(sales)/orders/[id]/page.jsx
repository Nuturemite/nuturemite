"use client"

import { useState } from "react";
import { Button } from "@/components/ui/index"; // Adjust according to actual imports
import { Edit } from "lucide-react";
import api from "@/lib/api";
import { useOrder } from "@/lib/data";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import CustomSelect from "@/components/ui/custrom-select";

const statuses = [
  { id: "pending", name: "Pending" },
  { id: "placed", name: "Placed" },
  { id: "confirmed", name: "Confirmed" },
  { id: "picked", name: "Picked" },
  { id: "onway", name: "On Way" },
  { id: "delivered", name: "Delivered" },
  { id: "returned", name: "Returned" },
  { id: "cancelled", name: "Cancelled" },
  { id: "paused", name: "Paused" },
];

const OrderPage = ({ params }) => {
  const orderId = params.id;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pending, setPending] = useState(false);
  const { order, isLoading, erroor } = useOrder(orderId);

  const handleStatusChange = async event => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    setPending(true);
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error updating order status", error);
    } finally {
      setPending(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        {order && (
          <>
            <div className="mb-4">
              <span className="font-semibold">Order ID:</span> {order._id}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Total Amount:</span> ${order.totalAmount}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Current Status:</span> {order.status}
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Update Status:
              </label>
              <CustomSelect
                options={statuses}
                value={selectedStatus}
                onChange={handleStatusChange}
                disabled={pending}
                className="mt-1 block w-full"
                getOptionLabel={status => status.charAt(0).toUpperCase() + status.slice(1)}
                getOptionValue={status => status}
              />
              {pending && <div className="text-gray-500">Saving...</div>}
            </div>
            <Button
              disabled={pending}
              onClick={() => alert("Save changes")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <Edit className="inline mr-2" /> Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
