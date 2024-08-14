import React from "react";
import { StudentsDataTable } from "./students-table";
import { columns } from "./column";
import { getData } from "@/data/random_data";

export default async function StudentsPage() {
  const data = await getData();
  return (
    <div className="grid items- gap-0">
      <h1 className="text-3xl font-bold text-black">Data Students</h1>
      <StudentsDataTable columns={columns} data={data} />
    </div>
  );
}
