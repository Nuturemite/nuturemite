"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/authprovider";
import { formatString } from "@/lib/utils";

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <div>
      {" "}
      <header className="sticky top-0 z-[5] w-full gap-4 h-16 flex items-center px-6 justify-between bg-white">
        <Link href="/">
          <h2 className="text-xl uppercase font-medium">{"Nuturemite"}</h2>
        </Link>
        <h2 className="text-xl uppercase font-medium">{"Register"}</h2>
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
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-slate-600">{formatString(user.role || "")}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
