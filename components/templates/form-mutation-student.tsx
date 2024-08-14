"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/molecules/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules/shadcn/form";
import { Input } from "@/components/molecules/shadcn/input";
import { toast } from "@/components/molecules/shadcn/use-toast";
import { Icons } from "../molecules/shadcn/icons";
import { DialogClose } from "../molecules/shadcn/dialog";
import { AlertDialogCancel } from "../molecules/shadcn/alert-dialog";

const FormSchema = z.object({
  name: z.string().min(0, {
    message: "Full Name is required",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  phone: z.string().min(0, {
    message: "Phone number is required",
  }),
  instance: z.string().min(0, {
    message: "Instance is required",
  }),
  password: z.string().min(0, {
    message: "Password is required",
  }),
  retypePassword: z
    .string()
    .min(0, {
      message: "Re-type Password is required",
    })
    .refine((data) => data === data, {
      message: "Password does not match",
    }),
});

export function FormMutationStudent() {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/2 space-y-8">
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
          <div className="flex flex-col w-1/2 space-y-8">
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
        <div
          {...getRootProps()}
          className="p-10 border-dotted border-2 mt-10 rounded-md"
        >
          <Input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="text-center text-black">
              <Icons.upload className="w-10 h-10 mx-auto pb-2" />
              <span className="font-bold">Click to upload</span> or drag and
              drop <br />
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          )}
        </div>
        <div className="flex flex-row w-full justify-end mt-8 gap-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" variant={"default"}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
