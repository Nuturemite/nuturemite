"use client";
import React, { useState } from "react";
import { useVendorShipments } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { formatString } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Edit } from "lucide-react";
import SearchInput from "@/components/filters/search";
import UpdateShipmentDialog from "./dialog";
import OrderStatus from "@/components/shared/admin/OrderStatus";

const ShipmentTable = () => {
  const { shipments, error, isLoading ,mutate} = useVendorShipments({ limit: 50 });
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  if (error) return <Error />;

  const columns = [
    {
      label: "Shipment ID",
      render: item => item._id,
    },
    {
      label: "Order ID",
      render: item => item.order,
    },
    {
      label: "Tracking ID",
      render: item => item.trackingId,
    },
    {
      label: "Carrier",
      render: item => item.carrier,
    },
    {
      label: "Address",
      render: item => item.shippingAddress.address,
    },
    {
      label: "Status",
      render: item => (<OrderStatus status={item.status}/>),
    },
    {
      label: "Date",
      render: item => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  const actions = item => (
    <>
      <UpdateShipmentDialog mutate={mutate} shipmentId={item._id} onClose={() => setSelectedShipmentId(null)} />
      
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={shipments}
        isLoading={isLoading}
        actions={actions}
        caption="List of all shipments."
      />
    </div>
  );
};

export default ShipmentTable;
