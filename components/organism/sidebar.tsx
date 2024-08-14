"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/molecules/shadcn/button";
import { SidebarNavItem } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/molecules/shadcn/tooltip";
import { Icons } from "@/components/molecules/shadcn/icons";
import { useState } from "react";
import { siteConfig } from "@/config/site";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export const Sidebar = ({ items }: DashboardNavProps) => {
  const [expanded, setExpanded] = useState(true);
  const path = usePathname();

  return (
    <div
      className={`${
        expanded ? "w-[18rem]" : "w-[5rem]"
      } transition-all !duration-300 flex flex-col space-y-6 p-6 pt-9 border-r bg-[#1C1C1C]`}
    >
      <div className="flex flex-row justify-between">
        {expanded && (
          <Link href="/" className="my-auto">
            <div className="flex items-center justify-center gap-x-2">
              <Image
                className="overflow-hidden"
                src="logo.svg"
                alt="Logo"
                height={200}
                width={200}
              />
              <span className={cn("font-semibold text-xl line-clamp-2")}>
                {/* {siteConfig.name} */}
              </span>
            </div>
          </Link>
        )}
        {/* <Button
          onClick={() => setExpanded(!expanded)}
          className={`${
            expanded ? "mx-auto" : "mx-auto w-full"
          }"rounded-md p-3 text-md font-medium bg-gray-50 hover:bg-gray-100 text-foreground"`}
        >
          {expanded ? <Icons.collapse /> : <Icons.expand />}
        </Button> */}
      </div>
      <nav className="space-y-1 w-full">
        <div className="text-lg text-[#9E9E9E] mb-4 mt-7">MENU</div>
        {items.map((item, index) => {
          const Icon = Icons[(item.icon as keyof typeof Icons) || "arrowRight"];
          return (
            item.href && (
              <Link key={index} href={item.disabled ? "/" : item.href}>
                <li
                  className={cn(
                    "group flex items-center rounded-md p-2 text-md font-medium hover:bg-red-900 hover:dark:bg-green-700 space-x-4 my-2",
                    path === item.href
                      ? "bg-primary dark:bg-green-700 text-white"
                      : "transparent text-gray-400",
                    item.disabled && "cursor-not-allowed opacity-80",
                    !expanded && "justify-center"
                  )}
                >
                  {!expanded ? (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Icon className="mx-auto w-full" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <>
                      <Icon className="w-6 h-6" />
                      <span className={`!line-clamp-1 text-ellipsis`}>
                        {item.title}
                      </span>
                    </>
                  )}
                </li>
              </Link>
            )
          );
        })}
      </nav>
    </div>
  );
};
