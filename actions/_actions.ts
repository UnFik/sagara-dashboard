import { FormSchema } from "@/components/templates/form-mutation-student";
import { addStudent, updateStudent } from "./students";
import { z } from "zod";

export async function addStudentAction(data: z.infer<typeof FormSchema>) {
  const res = await addStudent(data);
  return res;
}

export async function updateStudentAction(data: z.infer<typeof FormSchema>) {
  const res = await updateStudent(data);

  return res;
}
