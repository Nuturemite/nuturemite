"use client";

import { useRefunds} from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { formatString } from "@/lib/utils";
import Error from "@/components/shared/error";
import SearchInput from "@/components/filters/search";

const RefundTable = () => {
  const { refunds, error, isLoading} = useRefunds();

  if (error) return <Error />;

  const columns = [
    {
      label: "Refund ID",
      render: item => item._id,
    },
    {
      label: "User ",
      render: item => item.user.name,
    },
    {
      label: "Order ID",
      render: item => item.subOrder,
    },
    {
      label: "Amount",
      render: item => `₹${item.refundAmount}`,
    },
    {
      label: "Reason",
      render: item => item.reason,
    },
    {
      label: "Status",
      render: item => <RefundStatus status={item.status} />,
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
        data={refunds}
        isLoading={isLoading}
        caption="List of all refunds."
      />
    </div>
  );
};
const RefundStatus = ({ status }) => {
  const badgeClasses = {
    pending: "bg-yellow-200 text-yellow-600",
    approved: "bg-green-200 text-green-600",
    rejected: "bg-red-200 text-red-600",
  };

  return (
    <span className={`badge ${badgeClasses[status] || "bg-blue-200 text-blue-600"} px-2 py-1 rounded-full text-xs`}>
      {formatString(status)}
    </span>
  );
};
export default RefundTable;
