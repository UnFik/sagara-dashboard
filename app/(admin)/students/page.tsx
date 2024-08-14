import React from "react";
import { StudentsDataTable } from "./students-table";
import { columns } from "./column";
import { getStudents } from "@/actions/students";
import { Student } from "@/types";

export default async function StudentsPage() {
  const data: Student[] = await getStudents();
  return (
    <div className="grid items- gap-0">
      <h1 className="text-3xl font-bold text-black">Data Students</h1>
      <StudentsDataTable columns={columns} data={data} />
    </div>
  );
}
