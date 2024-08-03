import Navbar from "@/components/shared/admin/Navbar";
import Sidebar from "@/components/shared/admin/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="text-slate-900 bg-gray-100">
      <div className="relative flex min-h-screen ">
        <Sidebar />
        <div className="w-full px-2 mt-1 relative ">
          <Navbar />
          <div >{children}</div>
        </div>
      </div>
    </div>
  );
}
