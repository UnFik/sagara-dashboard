"use server";

import { FormSchema } from "@/components/templates/form-mutation-student";
import { prisma } from "@/prisma/db";
import { z } from "zod";

export async function getStudents() {
  const res = await prisma.student.findMany();
  return res;
}

export async function getStudent(id: number) {
  const res = await prisma.student.findFirst({
    where: {
      id: id,
    },
  });

  return res;
}

export const addStudent = async (data: z.infer<typeof FormSchema>) => {
  const res = await prisma.student.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      instance: data.instance,
      password: data.password,
      image: data.image,
    },
  });

  return res;
};

export async function deleteStudent(id: number) {
  const res = await prisma.student.delete({
    where: {
      id,
    },
  });

  return res;
}

export const updateStudent = async (data: z.infer<typeof FormSchema>) => {
  const res = await prisma.student.update({
    where: {
      id: Number(data.id),
    },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      instance: data.instance,
      password: data.password,
      image: data.image,
    },
  });

  return res;
};
