"use client";
import React, { useState } from "react";
import Icon from "@/components/shared/common/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { useAuthContext } from "@/context/authprovider";

const sidebarItemsVendor = [
  {
    icon: Home,
    title: "Dashboard",
    link: "/vendor/",
  },
  {
    icon: User,
    title: "Customers",
    link: "/vendor/users",
  },
  {
    icon: ShoppingBag,
    title: "Product",
    link: "/vendor/product",
  },
  {
    icon: Boxes,
    title: "Inventory",
    link: "/vendor/inventory",
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
    icon: Settings,
    title: "Settings",
    link: "/vendor/settings/",
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
    title: "Customers",
    link: "/vendor/users",
  },
  {
    icon: Settings,
    title: "Settings",
    link: "/vendor/products/",
  },
];

function Sidebar({ className }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const activePath = usePathname().split("/")[2];
  const { user } = useAuthContext();
  const sidebarItems = sidebarItemsVendor;

  return (
    <aside
      aria-label="sidebar"
      aria-controls="default-sidebar"
      className={`${className} sticky top-0 bottom-0 left-0 h-[100vh] bg-gray-800 font-urbanist ${
        isMinimized ? "w-[60px]" : "w-[260px]"
      } px-6 transition-width duration-300`}
    >
      <div className="wrapper pt-6">
        <div className={`${!isMinimized && "flex justify-between items-center"} mb-4`}>
          <Link href="/">
            <span
              className={`text-lg px-4 font-semibold tracking-wide text-slate-200 ${
                isMinimized && "hidden"
              }`}
            >
              Nuturemite
            </span>
          </Link>
          <Minimize2
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-200 cursor-pointer"
            size={20}
          />
        </div>
        <ul className="flex flex-col gap-4">
          {sidebarItems.map(item => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`${
                  !isMinimized && "flex items-center px-4 py-2"
                } p-1  text-slate-200 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-slate-300 text-slate-800"
                }`}
              >
                <item.icon size={20} />
                <span className={`ml-4 text-sm tracking-wider ${isMinimized && "hidden"}`}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <div
              className={`flex items-center px-4 py-2 text-red-400 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                isMinimized && "justify-center"
              }`}
            >
              <Icon icon={"uil:signout"} className="hover:text-white text-2xl" />
              <span className={`ml-4 text-sm tracking-wider ${isMinimized && "hidden"}`}>
                Sign out
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
