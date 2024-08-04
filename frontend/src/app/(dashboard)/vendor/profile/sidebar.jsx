"use client";
import React from "react";
import {
  Home,
  User,
  CreditCard,
  MapPin,
  Trash,
  Lock,
  Store,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

export const sidebarItems = [
  {
    icon: User,
    title: "Profile",
    link: "/vendor/profile",
  },
  {
    icon: CreditCard,
    title: "Bank",
    link: "/vendor/profile/bank",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business",
    link: "/vendor/profile/business",
  },
  {
    icon: Store,
    title: "Store",
    link: "/vendor/profile/store",
  },
  {
    icon: MapPin,
    title: "Address",
    link: "/vendor/profile/address",
  },
  {
    icon: Lock,
    title: "Password",
    link: "/vendor/profile/password",
  },
  {
    icon: Trash,
    title: "Delete Account",
    link: "/vendor/profile/delete",
  },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-[250px]  text-slate-900 border-r border-y bg-white">
      <div className="flex flex-col space-y-3 pt-4 px-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon; 
          return (
            <Link href={item.link} >
              <div className="flex flex-row items-center space-x-3 px-4 py-3  hover:bg-slate-100 transition duration-300">
                <Icon className="h-6 w-6 text-slate-500 transition duration-300 hover:text-slate-700" />
                <span className="text-slate-500 text-sm transition duration-300 hover:text-slate-700">
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
