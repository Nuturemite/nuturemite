"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minimize2 } from "lucide-react";
import { useAuthContext } from "@/context/authprovider";
import Loader from "../loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Sidebar({ className, sidebarItems }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const activePath = usePathname().split("/")[2];
  const { isLoading } = useAuthContext();
  if (isLoading) <Loader />;

  return (
    <aside
      aria-label="sidebar"
      aria-controls="default-sidebar"
      className={`${className} group sticky top-0 bottom-0 left-0 h-[100vh] bg-gray-800 font-urbanist max-md:hidden w-[60px] hover:w-[260px]
      px-6 transition-width duration-300`}
    >
      <div className="wrapper pt-6">
        <div className={`flex justify-between items-center mb-4`}>
          <Link href="/">
            <span
              className={`text-lg  font-semibold tracking-wide text-slate-200 hidden group-hover:block`}
            >
              Nuturemite
            </span>
          </Link>
          {/* <Minimize2
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-200 cursor-pointer"
            size={20}
          /> */}
        </div>
        <ul className="flex flex-col gap-4 mt-10">
          {sidebarItems.map(item =>
            item.items ? (
              <Accordion key={item.title} type="single" collapsible>
                <AccordionItem value={item.title}>
                  <AccordionTrigger
                    className={`flex items-center justify-between p-1 text-slate-200 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer `}
                  >
                    <div className="group-hover:flex items-center ">
                      <item.icon size={20} />
                      <span className={`ml-4 text-sm tracking-wider hidden group-hover:block`}>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <ul>
                      {item.items.map(subItem => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.link}
                            className={`flex items-center px-1 py-2 text-slate-200 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                              activePath === subItem.title.toLowerCase() &&
                              "bg-slate-300 text-slate-800"
                            }`}
                          >
                            <span>&bull;</span>
                            <span className={`ml-4 text-sm tracking-wider`}>{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <li key={item.title}>
                <Link
                  href={item.link}
                  className={` group-hover:flex items-center px-1 py-2 text-slate-200 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                    activePath === item.title.toLowerCase() && "bg-slate-300 text-slate-800"
                  }`}
                >
                  <item.icon size={20} />
                  <span className={`ml-4 text-sm tracking-wider group-hover:block hidden`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            )
          )}
          {/* <li>
            <div
              className={`flex items-center px-4 py-2 text-red-400 hover:bg-slate-100 hover:text-slate-800 transition duration-150 cursor-pointer ${
                isMinimized && "justify-center"
              }`}
            >
              <Icon icon={"uil:signout"} className="hover:text-white text-2xl" />
              <span className={`ml-4 text-sm tracking-wider ${isMinimized && "hidden"}`}>
                Sign out
              </span>
            </div>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
