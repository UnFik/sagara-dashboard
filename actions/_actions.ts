import { FormSchema } from "@/components/templates/form-mutation-student";
import { addStudent, deleteStudent, getStudent, getStudents, updateStudent } from "./students";
import { z } from "zod";

export async function addStudentAction(data: z.infer<typeof FormSchema>) {
  const res = await addStudent(data);
  return res;
}

export async function updateStudentAction(data: z.infer<typeof FormSchema>) {
  const res = await updateStudent(data);

  return res;
}

export async function deleteStudentAction(id: number) {
  const res = await deleteStudent(id);

  return res;
}

export async function getStudentsAction() {
  const res = await getStudents();
  return res;
}

export async function getStudentAction(id: number) {
  const res = await getStudent(id);
  return res;
}
