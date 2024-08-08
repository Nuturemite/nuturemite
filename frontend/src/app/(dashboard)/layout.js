"use client";
import Navbar from "@/components/shared/admin/Navbar";
import Sidebar from "@/components/shared/admin/Sidebar";
import { useAuthContext } from "@/context/authprovider";
import {
  Home,
  User,
  Settings,
  ShoppingBag,
  Package,
  Truck,
  FileText,
  CreditCard,
  Boxes,
  List,
  Minimize2,
  User2,
} from "lucide-react";

const sidebarItemsVendor = [
  {
    icon: Home,
    title: "Dashboard",
    link: "/vendor/",
  },
  {
    icon: Boxes,
    title: "Inventory",
    link: "/vendor/inventory",
  },
  {
    icon: ShoppingBag,
    title: "Product",
    link: "/vendor/product",
  },
  {
    icon: Package,
    title: "Orders",
    link: "/vendor/orders",
  },
  {
    icon: Truck,
    title: "Shipments",
    link: "/vendor/shipments",
  },
  {
    icon: FileText,
    title: "Invoices",
    link: "/vendor/invoices",
  },
  {
    icon: CreditCard,
    title: "Refunds",
    link: "/vendor/refunds",
  },
  // {
  //   icon: User,
  //   title: "Customers",
  //   link: "/vendor/users",
  // },
  {
    icon: List,
    title: "Category",
    link: "/vendor/category",
  },
  {
    icon: User2,
    title: "Profile",
    link: "/vendor/profile/",
  },
];

const sidebarItemsAdmin = [
  {
    icon: Home,
    title: "Dashboard",
    link: "/vendor/",
  },
  {
    icon: User,
    title: "Vendors",
    link: "/admin/vendors",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    link: "/admin/products",
  },
  {
    icon: Package,
    title: "Orders",
    link: "/vendor/orders",
  },
  {
    icon: Truck,
    title: "Shipments",
    link: "/vendor/shipments",
  },
  {
    icon: FileText,
    title: "Invoices",
    link: "/vendor/invoices",
  },
  {
    icon: CreditCard,
    title: "Refunds",
    link: "/vendor/refunds",
  },
  {
    icon: List,
    title: "Category",
    link: "/vendor/category",
  },
 
];

export default function DashboardLayout({ children }) {
  const { user } = useAuthContext();
  if (!user) return;
  const sidebarItems = user.role === "vendor" ? sidebarItemsVendor : sidebarItemsAdmin;
  
  return (
    <div className="text-slate-900 bg-gray-100">
      <div className="relative flex min-h-screen ">
        <Sidebar sidebarItems={sidebarItems} />
        <div className="w-full px-2 mt-1 relative ">
          <Navbar sidebarItems={sidebarItems}/>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
