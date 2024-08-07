"use client";
import Navbar from "./navbar";

export default function HomeLayout({ children }) {
  return (
    <div className="text-slate-900 bg-gray-100">
      <div className="relative flex min-h-screen ">
        <div className="w-full md:ml-2 mt-1 relative ">
          {/* Navbar */}
          <Navbar />
          {/* Children */}
          <div className="p-4 ">{children}</div>
        </div>
      </div>
    </div>
  );
}
