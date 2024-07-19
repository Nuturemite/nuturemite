"use client";
import React from "react";
import Icon from "@/components/shared/common/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Settings, ShoppingBag, Slack, Radar } from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  {
    icon: Home,
    title: "Dashboard",
    link: "/admin/",
  },
  {
    icon: User,
    title: "Customers",
    link: "/admin/users",
  },
  {
    icon: ShoppingBag,
    title: "Products",
    link: "/admin/product",
  },
  {
    icon: Slack,
    title: "Brand",
    link: "/admin/brand",
  },
  {
    icon: Radar,
    title: "Category",
    link: "/admin/category",
  },

  {
    icon: Settings,
    title: "Settings",
    link: "/admin/settings/",
  },
];
function Sidebar({ className }) {
  const activePath = usePathname().split("/")[2];

  return (
    <aside
      aria-label="sidebar"
      aria-controls="default-sidebar"
      className={`${className} sticky top-0 bottom-0 left-0 h-[100vh] max-lg:hidden bg-gray-800 font-urbanist w-[260px] px-6`}
    >
      <div className="wrapper pt-6">
        <Link href="/">
          <span className="text-lg px-4 font-semibold tracking-wide text-slate-200 mb-8  block">
            Nuturemite
          </span>
        </Link>
        {/* <hr className="bg-slate-700 text-slate-500  my-6"/> */}
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`flex items-center px-4 py-2 text-slate-200 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-slate-300 text-slate-800"
                }`}
              >
                <item.icon size={20} />
                <span className="ml-4 text-sm  tracking-wider">{item.title}</span>
              </Link>
            </li>
          ))}
          <li>
            <div className="flex items-center px-4 py-2 text-red-400 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer">
              <Icon icon={"uil:signout"} className="hover:text-white text-2xl" />
              <span className="ml-4 text-sm  tracking-wider">Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;

// const sidebarItems = [
//   {
//     icon: "mynaui:home",
//     title: "Home",
//     link: "/admin/",
//   },
//   {
//     icon: "mingcute:user-3-line",
//     title: "Users",
//     link: "/admin/users",
//   },
//   {
//     icon: "fluent-mdl2:product",
//     title: "Products",
//     link: "/admin/products",
//   },
//   {
//     icon: "cib:brand-ai",
//     title: "Brand",
//     link: "/admin/brand",
//   },
//   {
//     icon: "material-symbols:category-outline",
//     title: "Category",
//     link: "/admin/category",
//   },

//   {
//     icon: "mdi:account-outline",
//     title: "Account",
//     link: "/admin/account",
//   },
//   {
//     icon: "solar:settings-linear",
//     title: "Settings",
//     link: "/admin/",
//   },
// ];
{
}
