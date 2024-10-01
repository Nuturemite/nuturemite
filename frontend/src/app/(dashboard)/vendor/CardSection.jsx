"use client";
import { ShoppingCart, Users, DollarSign, CreditCard } from "lucide-react";
import { useAnalytics } from "@/lib/data";
import Loader from "@/components/shared/loader";
import Error from "@/components/shared/error";

const Card = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-4   flex items-center justify-between">
      <div className="flex items-center">
        <Icon size={30} className={`p-2  text-white`} style={{ backgroundColor: color }} />
        <div className="ml-4">
          <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const CardSection = () => {
  const { analytics, isLoading, error } = useAnalytics();
  if (isLoading) return <Loader />;
  if (error) return <Error />;
  const { totalOrders, totalUsers, totalRevenue, totalPayments } = analytics;
  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Orders" value={totalOrders} icon={ShoppingCart} color="#4ade80" />
        <Card title="Users" value={totalUsers} icon={Users} color="#38bdf8" />
        <Card title="Revenue" value={totalRevenue} icon={DollarSign} color="#f97316" />
        <Card title="Payments" value={totalPayments} icon={CreditCard} color="#8b5cf6" />
      </div>
    </div>
  );
};

export default CardSection;
    