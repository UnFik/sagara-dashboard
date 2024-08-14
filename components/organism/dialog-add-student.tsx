import React, { useState } from "react";
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
  const [showDialog, setShowDialog] = useState(false);

  const closeDialog = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Button
        variant={"default"}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        <span>
          <Icons.plus className="w-4 h-4 md:mr-3" />
        </span>
        <span className="max-md:hidden">Add User</span>
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="sm:max-w-[800px]">
          <AlertDialogHeader className="flex flex-row justify-between items-center align-middle">
            <AlertDialogTitle className="text-xl">
              Add New Student
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent border-none">
              <Button size={"icon"} variant={"ghost"}>
                <Icons.close className="w-4 h-4" />
              </Button>
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="border-b"></div>
          <FormMutationStudent closeDialog={closeDialog} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
