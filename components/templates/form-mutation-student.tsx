"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/molecules/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules/shadcn/form";
import { Input } from "@/components/molecules/shadcn/input";
import { toast } from "@/components/molecules/shadcn/use-toast";
import { Icons } from "../molecules/shadcn/icons";
import { AlertDialogCancel } from "../molecules/shadcn/alert-dialog";
import { Student } from "@/types";
import { addStudentAction, updateStudentAction } from "@/actions/_actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(1, {
    message: "Full Name is required",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  instance: z.string().min(1, {
    message: "Instance is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  retypePassword: z
    .string()
    .min(1, {
      message: "Re-type Password is required",
    })
    .refine((data) => data === data, {
      message: "Password does not match",
    }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
});

interface FormMutationStudentProps {
  student?: Student;
  closeDialog: () => void;
}

export function FormMutationStudent({
  student,
  closeDialog,
}: FormMutationStudentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  let isAdd: Boolean;
  student ? (isAdd = false) : (isAdd = true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: 0,
      name: student?.name || "",
      email: student?.email || "",
      phone: student?.phone || "",
      instance: student?.instance || "",
      password: student?.password || "",
      retypePassword: student?.password || "",
      image: student?.image || "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      console.log(acceptedFiles);
      form.setValue("image", acceptedFiles[0].path);
      console.log(form.getValues("image"));
    },
    [form]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    let res: Student;
    setLoading(true);
    if (isAdd) {
      // Add New Student
      res = await addStudentAction(data);
    } else {
      // Edit Student
      data.id = student?.id || 0;
      res = await updateStudentAction(data);
    }

    if (!res) {
      setLoading(false);
      toast({
        title: `Failed to ${isAdd ? "Add" : "Update"} User`,
        description: `Failed to add User`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `Data User ${isAdd ? "Added" : "Updated"} Successfully`,
      description: `User Data ${res.name} has been ${
        isAdd ? "Added" : "Update"
      }`,
      variant: "success",
    });

    setLoading(false);
    closeDialog();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/2 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+62 8453875329" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-1/2 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instance</FormLabel>
                  <FormControl>
                    <Input placeholder="Instance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retypePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-type Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-type Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormControl>
                <div
                  {...getRootProps()}
                  className="p-10 border-dotted border-2 rounded-md"
                >
                  <Input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p className="text-center text-black">
                      <Icons.upload className="w-10 h-10 mx-auto pb-2" />
                      <span className="font-bold">Click to upload</span> or drag
                      and drop <br />
                      SVG, PNG, JPG or GIF (max, 800 X 800px)
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row w-full justify-end mt-8 gap-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" variant={"default"} className="min-w-20">
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="">Save</div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
