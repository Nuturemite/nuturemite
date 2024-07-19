import React from "react";
import Sidebar from "./sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen ">
      <Sidebar/>
      <div className="w-full md:ml-2 mt-1 relative p-6">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
