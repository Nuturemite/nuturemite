import { useTopProducts } from "@/lib/data";
import DashTable from "./DashTable";

const TopProducts = () => {
  const { topProducts, isLoading, error } = useTopProducts();
  console.log(topProducts);
  
  const columns = [
    { key: "name", label: "Product Name" },
    { key: "totalOrders", label: "Total Orders" },
    { key: "totalRevenue", label: "Total Revenue" },
  ];
  
  if (error) return <div>Error: {error.message}</div>;
  return <DashTable data={topProducts} isLoading={isLoading} columns={columns} caption="Top Products" />;
};

export default TopProducts;