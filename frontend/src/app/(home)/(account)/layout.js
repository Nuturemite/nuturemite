"use client";
import React from "react";
import Sidebar from "./sidebar";
import { useAuthContext } from "@/context/authprovider";
import Loader from "@/components/shared/loader";

function DashboardLayout({ children }) {
  const { user } = useAuthContext();
  if (!user)
    <div className="min-h-screen">
      <Loader />
    </div>;
    
  return (
    <div className="relative flex min-h-screen  ">
      <Sidebar user={user} />
      <div className="w-full mt-1 relative md:p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
