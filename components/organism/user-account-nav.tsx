"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/molecules/shadcn/dropdown-menu";
import { Button } from "@/components/molecules/shadcn/button";
import { toast } from "@/components/molecules/shadcn/use-toast";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/molecules/shadcn/avatar";
import { Icons } from "../molecules/shadcn/icons";

export function UserAccountNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col">
            <p className="md:text-black text-base text-ellipsis overflow-hidden line-clamp-1 my-auto font-semibold sm:max-w-80 max-w-20">
              Thomas Anree
            </p>
            <p className="text-end font-semibold">Admin</p>
          </div>
          <div className="flex flex-row gap-2 justify-center align-middle">
            <Avatar className="w-12 h-12">
              <AvatarImage alt="Picture" src={""} className="w-full h-auto" />
              <AvatarFallback>Fall</AvatarFallback>
            </Avatar>
            <Icons.chevronDown className="w-6 h-6 my-auto" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium w-[200px] truncate text-muted-foreground">
              Sagara
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className=" w-[200px] truncate text-muted-foreground">12331</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start gap-2 p-2">
          <Button
            onClick={() => {}}
            variant={"ghost"}
            className="flex flex-col space-y-1 leading-none text-center w-full"
          >
            Sign Out
          </Button>
        </div>
        {/* <SignOut /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
