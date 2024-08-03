import { Sidebar } from "./sidebar";

export default function SettingsLayout({ children }) {
  return (
    <div className="relative flex min-h-screen py-2">
      <Sidebar />
      <div className="w-full mt-1 relative p-4">{children}</div>
    </div>
  );
}
