import "../../app/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authprovider";
import Navbar from "@/components/shared/admin/Navbar";
import Sidebar from "@/components/shared/admin/Sidebar";

export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <div className="text-slate-900">
            <div className="relative flex min-h-screen ">
              <Sidebar/>
              <div className="w-full md:ml-2 mt-1 relative">
                <Navbar />
                <div className="p-4">{children}</div>
              </div>
            </div>
            <Toaster position="bottom-center" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}