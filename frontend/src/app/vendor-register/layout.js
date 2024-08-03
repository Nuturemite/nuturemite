import "../../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import Navbar from "./navbar";

export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default function HomeLayout({ children }) {
  return (
    <div className="text-slate-900">
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
