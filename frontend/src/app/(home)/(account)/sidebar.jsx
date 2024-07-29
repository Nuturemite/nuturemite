"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart, User, Package, LogOut, Home } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";

const dashboardItems = [
  {
    icon: User,
    title: "Account",
    link: "/account",
  },
  {
    icon: Heart,
    title: "Wishlist",
    link: "/wishlist",
  },
  {
    icon: Package,
    title: "Orders",
    link: "/orders",
  },
  {
    icon: Home,
    title: "Address",
    link: "/address",
  },
];

function Sidebar({ className }) {
  const activePath = usePathname().split("/")[2];

  return (
    <aside className={cn(className, "w-[300px] max-md:hidden stick top-0 right-0  px-6 border-r border-slate-200 bg-white min-h-[60vh]")}>
      <div className="pt-10 text-slate-600 flex gap-2 ml-2  items-center">
        <Avatar name="Mayank" />
        <div className="ml-4">
          <span className="font-semibold tracking-wide">Hi! </span>
          <span className="ml-2"> {"Mayank"}</span>
        </div>
      </div>

      <div className="pt-6">
        <ul>
          {dashboardItems.map(item => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`flex mb-4 items-center px-4 py-3 text-slate-700 hover:bg-tert-100 active:bg-tert-100 hover:text-white transition duration-150 cursor-pointer ${
                  activePath === item.title.toLowerCase() && "bg-tert-100 text-white"
                }`}
              >
                <item.icon className="hover:text-white text-2xl" />
                <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
            <li className="flex  mb-4 items-center px-4 py-3 text-slate-700 hover:bg-tert-100 hover:text-white transition duration-150 cursor-pointer">
              <LogOut className="hover:text-white text-2xl" />
              <span className="ml-8 text-[0.9rem] font-semibold tracking-wider">Sign out</span>
            </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
