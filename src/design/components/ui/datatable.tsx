import {
  Column,
  flexRender,
  SortingState,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnPinningState,
  getPaginationRowModel,
  ColumnDef as TanstackColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "./table";

import { cn } from "@/design/lib/utils";
import React, { useState } from "react";
import { Button } from "@/design/components/ui/button";
import { ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface IDataTablePagination extends PaginationState {}

export type AppColumnDef<TData, TValue = unknown> = TanstackColumnDef<
  TData,
  TValue
> & {
  pinSide?: "left" | "right" | false;
};

type PaginationUpdater = React.Dispatch<React.SetStateAction<PaginationState>>;

interface DataTableProps<TData, TValue> {
  data: TData[];
  totalItems?: number;
  noContentText?: string;
  sorting?: SortingState;
  pagination?: IDataTablePagination;
  columns: AppColumnDef<TData, TValue>[];
  onPaginationChange?: PaginationUpdater;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    data,
    columns,
    totalItems = 0,
    onPaginationChange,
    noContentText = "Sem resultados",
    pagination = { pageIndex: 0, pageSize: 5 },
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(() => {
    const _data: ColumnPinningState = { left: [], right: [] };

    columns.forEach((column) => {
      const id = column.id;
      if (column.pinSide === "left") _data?.left?.push(String(id));
      else if (column.pinSide === "right") _data?.right?.push(String(id));
    });

    return _data;
  });

  const table = useReactTable({
    data,
    columns,
    onPaginationChange,
    manualPagination: true,
    enableColumnPinning: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnPinningChange: setColumnPinning,
    state: { pagination, sorting, columnPinning },
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalItems / pagination.pageSize),
  });

  return (
    <section className="relative">
      <article className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "transition-colors",
                        isPinned ? "z-10" : "z-0",
                        isPinned === "left" && "left-0 border-r",
                        isPinned === "right" && "right-0 border-l",
                        isPinned && "bg-background sticky"
                      )}
                      style={{
                        width: header.column.getSize(),
                        left:
                          isPinned === "left"
                            ? `${header.column.getStart("left")}px`
                            : undefined,
                        right:
                          isPinned === "right"
                            ? `${header.column.getAfter("right")}px`
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <section className="flex gap-1">
                          {header.column.getIsPinned() !== "left" && (
                            <button onClick={() => header.column.pin("left")}>
                              <ChevronLeft />
                            </button>
                          )}
                          {header.column.getIsPinned() && (
                            <button onClick={() => header.column.pin(false)}>
                              <X />
                            </button>
                          )}
                          {header.column.getIsPinned() !== "right" && (
                            <button onClick={() => header.column.pin("right")}>
                              <ChevronRight />
                            </button>
                          )}
                        </section>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "transition-colors",
                          isPinned ? "z-10" : "z-0",
                          isPinned === "left" && "left-0 border-r",
                          isPinned === "right" && "right-0 border-l",
                          isPinned && "bg-background sticky"
                        )}
                        style={{
                          width: cell.column.getSize(),
                          left:
                            isPinned === "left"
                              ? `${cell.column.getStart("left")}px`
                              : undefined,
                          right:
                            isPinned === "right"
                              ? `${cell.column.getAfter("right")}px`
                              : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noContentText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </article>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}

interface IDataTableHeaderProps<Data> {
  title: string;
  className?: string;
  column: Column<Data, unknown>;
}

export function DataTableHeader<IData>(props: IDataTableHeaderProps<IData>) {
  const { column, title, className } = props;
  const isSortMode = column?.columnDef?.enableSorting || false;

  const handleToggleSort = () => {
    if (!isSortMode) return;
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  return (
    <span
      className={cn("flex items-center", className)}
      onClick={handleToggleSort}
    >
      {title}
      {isSortMode && (
        <Button variant="ghost" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )}
    </span>
  );
}
