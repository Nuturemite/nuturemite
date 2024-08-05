import React from "react";
import Sidebar from "./sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen  ">
      <Sidebar />
      <div className="w-full mt-1 relative md:p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
