"use client";
import { useShipments } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import Error from "@/components/shared/error";
import SearchInput from "@/components/filters/search";
import OrderStatus from "@/components/shared/admin/OrderStatus";


const ShipmentTable = () => {
  const { shipments, error, isLoading } = useShipments();

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
        caption="List of all shipments."
      />
    </div>
  );
};

export default ShipmentTable;
