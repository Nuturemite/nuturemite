"use client";
import Link from "next/link";
import React from "react";
import Icon from "@/components/shared/common/icon";
import { useAuthContext } from "@/context/authprovider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useCategories } from "@/lib/data";
import ProductSearch from "./ProductSearch";
import { Header } from "./Header";
import HomeDrawer from "@/components/drawers/HomeDrawer";
import logo from "@/assests/logo.jpeg";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  const menuItems = () => {
    if (isAuthenticated) {
      if (user.role == "vendor") {
        return [
          { text: "Shop", href: "/shop" },
          { text: "My Account", href: "/account" },
          { text: "Dashboard", href: "/vendor" },
          // { text: "Blogs", href: "/blogs" },
        ];
      } else if (user.role == "admin") {
        return [
          { text: "Shop", href: "/shop" },
          { text: "My Account", href: "/account" },
          { text: "Dashboard", href: "/admin" },
          // { text: "Blogs", href: "/blogs" },
        ];
      } else {
        return [
          { text: "Shop", href: "/shop" },
          { text: "My Account", href: "/account" },
          // { text: "Blogs", href: "/blogs" },
        ];
      }
    } else {
      return [
        { text: "Shop", href: "/shop" },
        { text: "Login", href: "/auth/login" },
        // { text: "Blogs", href: "/blogs" },
      ];
    }
  };

  return (
    <>
      <Header />
      <nav className="bg-primary sticky top-0 z-50 border-slate-200 border-b px-4 md:px-12 flex gap-16 items-center justify-between">
        {/* Mobile menu */}
        <div className="flex gap-2 items-center text-white ">
          <div className="md:hidden">
            <HomeDrawer />
          </div>

          <Link href="/">
            <div className="flex items-center gap-2">
              <img className="h-12 md:h-16 lg:h-20 " src={logo.src} alt="" />
            </div>
          </Link>
        </div>
        {/* Desktop menu */}
        <div>
          <div className="hidden w-full md:block">
            <ul className="font-medium  items-center flex flex-col  border-slate-100  md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-slate-700">
              <ProductSearch />
              <CatNav />
              <li></li>
              {menuItems().map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.href} className="navbar-heading">
                    {menuItem.text}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li
                  onClick={handleLogout}
                  className="cursor-pointer navbar-heading"
                >
                  Logout
                </li>
              )}

              <li className="max-sm:hidden">
                <Link href={"/cart"}>
                  <Icon
                    icon="mynaui:cart"
                    fontSize={28}
                    className="text-tert-100 cursor-pointer "
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden flex gap-2 items-center">
            <Link href={"/cart"}>
              <Icon
                icon="mynaui:cart"
                fontSize={28}
                className="text-tert-100 cursor-pointer "
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

const CategoryBox = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    const { categories, isLoading, error } = useCategories({});
    if (isLoading || error || !categories) return;

    return (
      <NavigationMenuContent>
        <ul className="grid h-[400px] overflow-y-scroll scrollbar w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {categories?.map((cat) => (
            <ListItem
              key={cat._id}
              title={cat.name}
              href={`/shop?categoryId=${cat._id}`}
            >
              {cat.description
                ? cat.description
                : "A set of layered sections of content—known as tab panels—that are displayed one at a time"}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    );
  }
);
CategoryBox.displayName = "CategoryBox";

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

const CatNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="navbar-heading">
            Categories
          </NavigationMenuTrigger>
          <CategoryBox />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

ListItem.displayName = "ListItem";
