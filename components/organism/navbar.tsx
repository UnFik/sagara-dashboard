"use client";

import { MainNavItem } from "@/types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserAccountNav } from "./user-account-nav";
import SheetNav from "@/components/organism/sheet-nav";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export const Navbar = ({ items }: MainNavProps) => {
  return (
    <div className="flex items-center gap-x-4 p-5 pe-10 border-b bg-white shadow-md">
      <div className="flex flex-1 ms-3 items-center">
        <div className="flex lg:hidden">
          <SheetNav items={items || []} />
        </div>
      </div>
      <UserAccountNav />
    </div>
  );
};
