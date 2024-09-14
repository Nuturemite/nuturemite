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

const iconList = [
  {
    icon: CiHome,
    path: "/",
  },
  {
    icon: CiFacebook,
    path: "https://facebook.com/nuturemite",
  },
  {
    icon: CiInstagram,
    path: "https://www.instagram.com/nuturemite_blog",
  },
  {
    icon: CiTwitter,
    path: "https://twitter.com/nuturemite",
  },
  {
    icon: CiYoutube,
    path: "https://www.youtube.com/c/Nuturemitehealth",
  },
];

export function Header() {
  return (
    <header className="relative bg-white flex flex-row lg:flex-row items-center justify-between px-5 md:px-12 py-2 h-[7vh]">
      <div className="flex max-sm:justify-between flex-row md:items-center md:gap-5 md:w-full ">
        <a
          href="tel:9675905075"
          className="flex gap-1 items-center text-sm md:text-sm"
        >
          <CiMobile1 />
          +91 891 999 3233
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
        {iconList.map((item) => (
          <li key={item.path}>
            <a href={item.path} target="_blank" rel="noreferrer">
              <item.icon className="text-2xl font-bold cursor-pointer" />
            </a>
          </li>
        ))}
      </div>
    </header>
  );
}

