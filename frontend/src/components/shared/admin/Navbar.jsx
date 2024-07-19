"use client";
import Icon from "@/components/shared/icon";
import Image from "next/image";
import SearchInput from "../search";
import Dashboard from "../dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

function Navbar() {
  const activePath =
    usePathname()?.split("/")[2]?.charAt(0)?.toUpperCase() + usePathname()?.split("/")[2]?.slice(1);

  return (
    <>
      <header className="sticky top-0 z-[5] w-full gap-4 h-16 flex items-center px-6 justify-between bg-white">
        <Sheet>
          <SheetTrigger asChild>
            <Icon icon="mingcute:menu-fill" className="text-3xl lg:hidden text-slate-700" />
          </SheetTrigger>
          <SheetContent>
            <Dashboard className={` lg:hidden absolute top-0 left-0 min-h-screen `} />
          </SheetContent>
        </Sheet>
        <h2 className="text-xl uppercase font-medium">{activePath || "Dashboard"}</h2>
        <SearchInput className={"md:w-full bg-slate-50"} />

        <div className="max-sm:hidden flex gap-10 justify-between items-center   px-2 py-1 ">
          <div className="flex  items-center gap-4">
            <Image
              width={48}
              height={48}
              src="/avatar.png"
              className=" rounded-full"
              alt="profile image"
            />
            <div className="flex flex-col max-sm:hidden ">
              <span className="text-sm">Anoop Singh</span>
              <span className="text-xs text-slate-600">Admin</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
