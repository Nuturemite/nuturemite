import { useTopUsers } from "@/lib/data";
import DashTable from "./DashTable";

const TopUsers = () => {
  const { topUsers, isLoading, error } = useTopUsers();
  console.log(topUsers);

  const columns = [
    { key: "name", label: "User Name" },
    { key: "totalOrders", label: "Total Orders" },
    { key: "totalRevenue", label: "Total Revenue" },
  ];

  if (error) return <div>Error: {error.message}</div>;
  return <DashTable data={topUsers} isLoading={isLoading} columns={columns} caption="Top Users" />;
};

export default TopUsers;