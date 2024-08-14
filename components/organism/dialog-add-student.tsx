import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/molecules/shadcn/alert-dialog";
import { Button } from "../molecules/shadcn/button";
import { FormMutationStudent } from "../templates/form-mutation-student";
import { Icons } from "../molecules/shadcn/icons";

export default function DialogAddStudent() {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"default"} onClick={() => {}}>
            <span>
              <Icons.plus className="w-4 h-4 mr-3" />
            </span>
            Add User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[800px]">
          <AlertDialogHeader className="flex flex-row justify-between items-center align-middle">
            <AlertDialogTitle className="text-2xl">
              Add New Student
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent border-none">
              <Button size={"icon"} variant={"ghost"}>
                <Icons.close className="w-4 h-4" />
              </Button>
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="border-b"></div>
          <FormMutationStudent />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
