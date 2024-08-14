import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/molecules/shadcn/sheet";
import { Icons } from "@/components/molecules/shadcn/icons";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export default function SheetNav({ items }: MobileNavProps) {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Icons.menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-[#1C1C1C]">
          <SheetHeader className="space-y-5">
            <SheetTitle>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="logo.svg"
                  alt="Logo Sagara"
                  width={200}
                  height={200}
                  // sizes="(max-width: 768px) 100vw, 700px"
                  // className="sm:w-8 sm:h-8 w-6 h-6 rounded-full"
                />
                {/* <span className="font-bold">{siteConfig.name}</span> */}
              </Link>
            </SheetTitle>
            <SheetDescription>
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                <div className="text-lg text-start mt-5 mb-3">MENU</div>
                {items.map((item, index) => {
                  const Icon =
                    Icons[(item.icon as keyof typeof Icons) || "arrowRight"];

                  return (
                    <div key={index} className="flex flex-row items-center">
                      <Icon className="w-6 h-6" />
                      <Link
                        key={index}
                        href={item.disabled ? "#" : item.href}
                        className={cn(
                          "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                          item.disabled && "cursor-not-allowed opacity-60"
                        )}
                      >
                        {item.title}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
