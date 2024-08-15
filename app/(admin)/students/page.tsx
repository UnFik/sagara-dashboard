import React from "react";
import { StudentsDataTable } from "./students-table";
import { columns } from "./column";
import { getStudentsAction } from "@/actions/_actions";
import { Student } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function StudentsPage() {
  const data: Student[] = await getStudentsAction();
  noStore();
  return (
    <div className="grid gap-0">
      <h1 className="text-3xl font-bold text-black">Data Students</h1>
      <StudentsDataTable columns={columns} data={data} />
    </div>
  );
}
