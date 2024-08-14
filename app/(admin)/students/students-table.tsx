"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/shadcn/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/molecules/shadcn/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/molecules/shadcn/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/shadcn/select";

import { Button } from "@/components/molecules/shadcn/button";
import { Input } from "@/components/molecules/shadcn/input";
import { useState } from "react";
import { Icons } from "@/components/molecules/shadcn/icons";
import { DataTableViewOptions } from "@/components/molecules/shadcn/data-table-column-visibility";
import DialogAddStudent from "@/components/organism/dialog-add-student";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StudentsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [filter, setFilter] = useState<string>("instance");
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="relative w-full overflow-auto">
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-row gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto bg-white text-black">
                <span>
                  <Icons.filter className="w-4 h-4 sm:mr-3" />
                </span>
                <span className="max-md:hidden">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-2">
              <Select
                onValueChange={(e) => {
                  setFilter(e);
                }}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue
                    placeholder={
                      filter.charAt(0).toUpperCase() + filter.slice(1)
                    }
                    defaultValue={filter}
                  />
                </SelectTrigger>
                <SelectContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <SelectItem
                          key={column.id}
                          value={column.id}
                          className="capitalize"
                        >
                          {column.id}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <Input
                defaultValue={"is"}
                disabled
                className="text-gray-700 w-[180px]"
              />
              <Input
                placeholder="Search"
                value={
                  (table.getColumn(filter)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(filter)?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-white"
              />
              <Button>Add Filter</Button>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogAddStudent />
        </div>

        <div className="flex flex-row gap-2">
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white"
          />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-t-md border bg-white">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-black font-semibold">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-2 px-5 bg-white border rounded-b-md">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Pagination>
          <PaginationContent className="max-sm:hidden">
            {table.getPageCount() > 0 &&
              Array.from({ length: Math.min(7, table.getPageCount()) }).map(
                (_, i) => {
                  let start = Math.max(
                    0,
                    Math.min(
                      table.getPageCount() - 7,
                      table.getState().pagination.pageIndex - Math.floor(7 / 2)
                    )
                  );
                  let index = start + i;

                  // Logic to add ellipsis
                  const isEllipsis =
                    (i === 0 && start > 0) || // Display ellipsis at the start
                    (i === 6 && index < table.getPageCount() - 1); // Display ellipsis at the end

                  if (isEllipsis) {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => table.setPageIndex(index)}
                        isActive={
                          index === table.getState().pagination.pageIndex
                        }
                        data-state={
                          index === table.getState().pagination.pageIndex &&
                          "selected"
                        }
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}
          </PaginationContent>
        </Pagination>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
