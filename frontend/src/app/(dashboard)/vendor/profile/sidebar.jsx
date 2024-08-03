"use client";
import React from "react";
import { Home, User, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";

export const sidebarItems = [
  {
    icon: User,
    title: "Profile",
    link: "/vendor/profile",
  },
  {
    icon: Home,
    title: "Business",
    link: "/vendor/profile/business",
  },
  {
    icon: CreditCard,
    title: "Bank",
    link: "/vendor/profile/bank",
  },
  {
    icon: MapPin,
    title: "Address",
    link: "/vendor/profile/address",
  },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-[250px]  text-slate-900 border-r border-y ">
      <div className="flex flex-col space-y-5 p-5">
        {sidebarItems.map((item) => {
          const Icon = item.icon; // Destructure icon to use directly
          return (
            <Link href={item.link} >
              <div className="flex flex-row items-center space-x-3 p-2  hover:bg-slate-300 transition duration-300">
                <Icon className="h-6 w-6 text-slate-500 transition duration-300 hover:text-slate-700" />
                <span className="text-slate-500 transition duration-300 hover:text-slate-700">
                  {item.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
