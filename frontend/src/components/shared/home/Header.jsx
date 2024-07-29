import React from "react";
import {
  CiFacebook,
  CiHome,
  CiInstagram,
  CiMail,
  CiMobile1,
  CiTwitter,
  CiYoutube,
} from "react-icons/ci";
export function Header() {
  return (
    <header className="relative bg-white flex flex-row lg:flex-row items-center justify-between px-5 md:px-20 py-2 h-[7vh]">
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 md:w-full w-[80%]">
        <a
          href="tel:9675905075"
          className="flex gap-1 items-center text-sm md:text-sm"
        >
          <CiMobile1 />
          +1 7678-232 32
        </a>
        <a
          href="mailto:Info@newlondonhospitality.com"
          className="flex gap-1 items-center text-sm md:text-sm"
        >
          <CiMail />
          info@nuturemite.com
        </a>
      </div>

      <div className="hidden md:flex list-none items-center justify-between gap-3">
        <li>
          <CiHome className="text-2xl font-bold cursor-pointer" />
        </li>
        <li>
          <CiFacebook className="text-2xl font-bold cursor-pointer" />
        </li>
        <li>
          <CiInstagram className="text-2xl font-bold cursor-pointer" />
        </li>
        <li>
          <CiTwitter className="text-2xl font-bold cursor-pointer" />
        </li>
        <li>
          <CiYoutube className="text-2xl font-bold cursor-pointer" />
        </li>
      </div>
    </header>
  );
}
