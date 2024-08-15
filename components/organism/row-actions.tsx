"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../molecules/shadcn/button";
import { Icons } from "../molecules/shadcn/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../molecules/shadcn/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/molecules/shadcn/alert-dialog";

import { FormMutationStudent } from "../templates/form-mutation-student";
import { deleteStudentAction } from "@/actions/_actions";
import { useRouter } from "next/navigation";
import { toast } from "../molecules/shadcn/use-toast";
import { useGetStudent } from "@/hooks/use-get-student";
import { revalidatePath } from "next/cache";

interface RowActionProps {
  id: number;
}

export default function RowAction({ id }: RowActionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);

  const { data, isLoading, refetch } = useGetStudent(id);
  const closeDialog = () => {
    setShowDialogEdit(false);
  };
  console.log(id);
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  return (
    <>
      <div className="flex">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  setShowDialogDelete(true);
                }}
              >
                <Icons.trash className="w-4 h-4 text-red-700 hover:text-red-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  setShowDialogEdit(true);
                }}
              >
                <Icons.edit className="w-4 h-4 text-yellow-600 hover:text-yellow-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <AlertDialog open={showDialogDelete} onOpenChange={setShowDialogDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this data?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 focus:ring-red-600"
              onClick={async () => {
                setLoading(true);
                const res = await deleteStudentAction(id).finally(() => {
                  setLoading(false);
                  setShowDialogDelete(false);
                  router.refresh();
                });
                toast({
                  title: "User Data Deleted",
                  description: `User Data ${res.name} has been deleted`,
                  variant: "success",
                });
              }}
            >
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog Edit */}

      <AlertDialog open={showDialogEdit} onOpenChange={setShowDialogEdit}>
        <AlertDialogContent className="sm:max-w-[800px]">
          <AlertDialogHeader className="flex flex-row justify-between items-center align-middle">
            <AlertDialogTitle className="text-2xl">
              Edit Data Student
            </AlertDialogTitle>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setShowDialogEdit(false);
              }}
            >
              <Icons.close className="w-4 h-4" />
            </Button>
          </AlertDialogHeader>

          <div className="border-b"></div>
          {data && (
            <FormMutationStudent student={data} closeDialog={closeDialog} />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
