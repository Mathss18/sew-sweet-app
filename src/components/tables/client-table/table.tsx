import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { cn } from "@/helpers";
import {
  ColumnDef,
  SortDirection,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter } from "./filter";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa6";
import { Button } from "../..";

type Data = {
  [key: string]: any;
};

export type ClientTableProps = {
  searchFieldName?: string;
  stripped?: boolean;
  data: Data[];
  columns: ColumnDef<Data, any>[] | any;
  props?: any;
} & ComponentProps<"div">;

export const ClientTable = ({
  title,
  className,
  searchFieldName,
  stripped = true,
  data,
  columns,
  ...props
}: ClientTableProps): JSX.Element => {
  const [tableData, setTableData] = useState(data);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string | number,
        value: unknown
      ) => {
        return setTableData((prev: any) =>
          prev.map((row: any, index: number) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        );
      },
    },
  });

  const [isResizing, setIsResizing] = useState(false);

  function getSortingIcon(sortType: SortDirection | false): ReactNode {
    if (!sortType) return <FaSort />;
    if (sortType === "asc") return <FaSortUp />;
    if (sortType === "desc") return <FaSortDown />;
  }

  function getStrippedClass(index: number): string {
    const defaultClass = "border-b hover:bg-gray-200 flex flex-grow";
    if (!stripped) return defaultClass;

    return index % 2 === 0
      ? `${defaultClass} bg-white`
      : `${defaultClass} bg-gray-100`;
  }

  function renderHeaders() {
    return table.getHeaderGroups().map((headerGroup) => (
      <div key={headerGroup.id} className="flex flex-grow">
        {headerGroup.headers.map((header) => (
          <div
            className="relative flex items-center justify-center min-w-0 px-6 py-4 flex-grow font-bold"
            style={{
              minWidth: 0,
              width: header.getSize(),
            }}
            key={header.id}
          >
            {((header: any) => header.column.columnDef.header)(header)}
            {header.column.getCanSort() && (
              <Button
                variant="plain"
                color="gray"
                onClick={header.column.getToggleSortingHandler()}
              >
                {getSortingIcon(header.column.getIsSorted())}
              </Button>
            )}
            <div
              style={{
                backgroundColor: header.column.getIsResizing() ? "red" : "gray",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
                header.getResizeHandler()(e);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                setIsResizing(true);
                header.getResizeHandler()(e);
              }}
              className={cn(
                "absolute top-0 bottom-0 right-0 bg-gray-500 cursor-col-resize border opacity-0 hover:opacity-100",
                isResizing && "opacity-100",
                isResizing ? "w-1" : "w-2"
              )}
            />
          </div>
        ))}
      </div>
    ));
  }

  function renderRows() {
    return table.getRowModel().rows.map((row, index) => (
      <div className={getStrippedClass(index)} key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <div
            className="flex items-center justify-center px-6 py-4 flex-grow"
            style={{ width: `${cell.column.getSize()}px` }}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
      </div>
    ));
  }

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isResizing]);

  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg"
      onMouseUp={() => {
        setIsResizing(false);
      }}
      onMouseLeave={() => {
        setIsResizing(false);
      }}
      {...props}
    >
      {searchFieldName && (
        <Filter
          className="m-4 w-1/4"
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          searchFieldName={searchFieldName}
        />
      )}

      <div className="w-full text-sm text-left text-gray-500">
        <div className="text-xs text-gray-700 uppercase bg-gray-300 flex">
          {renderHeaders()}
        </div>
        <div>{renderRows()}</div>
      </div>
      <div className="flex m-2 justify-between">
        <p className="m-2">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="gray"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaArrowLeft />
            Previous
          </Button>
          <Button
            variant="outlined"
            color="gray"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
