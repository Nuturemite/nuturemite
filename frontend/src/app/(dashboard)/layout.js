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
  User2Icon,
  Receipt,
  ImagePlus,
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
    title: "Products",
    items: [
      {
        title: "Approved",
        link: `/vendor/products?apvStatus=approved`,
      },
      {
        title: "New Requests",
        link: `/vendor/products?apvStatus=pending`,
      },
      {
        title: "Rejected",
        link: `/vendor/products?apvStatus=rejected`,
      },
    ],
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
  {
    icon: User2,
    title: "Profile",
    link: "/vendor/profile/",
  },
  {
    icon: Receipt,
    title: "Coupons",
    link: "/vendor/coupons",
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
    items: [
      {
        title: "Approved",
        link: "/admin/vendors?apvStatus=approved",
      },
      {
        title: "New Requests",
        link: "/admin/vendors?apvStatus=pending",
      },
      {
        title: "Rejected",
        link: "/admin/vendors?apvStatus=rejected",
      },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Products",
    items: [
      {
        title: "Approved",
        link: `/admin/products?apvStatus=approved`,
      },
      {
        title: "New Requests",
        link: `/admin/products?apvStatus=pending`,
      },
      {
        title: "Rejected",
        link: `/admin/products?apvStatus=rejected`,
      },
    ],
  },
  {
    icon: Package,
    title: "Orders",
    link: "/admin/orders",
  },
  {
    icon: Truck,
    title: "Shipments",
    link: "/admin/shipments",
  },
  {
    icon: User2Icon,
    title: "Customers",
    link: "/admin/customers",
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
  {
    icon: FileText,
    title: "Blogs",
    link: "/admin/blogs",
  },
  {
    icon: ImagePlus,
    title: "Banners",
    link: "/admin/banners",
  },
  {
    icon: Settings,
    title: "Settings",
    link: "/admin/settings",
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
          <Navbar sidebarItems={sidebarItems} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
