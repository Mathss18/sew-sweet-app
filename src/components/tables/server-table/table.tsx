import {
  ChangeEvent,
  ComponentProps,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/helpers";
import {
  ColumnDef,
  SortDirection,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Input } from "../..";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa6";
import { TableSkeleton } from "./table-skeleton";

type Data = {
  [key: string]: any;
};

export type ServerTableProps = {
  searchable?: boolean;
  stripped?: boolean;
  isLoading?: boolean;
  data: Data[];
  columns: ColumnDef<Data, any>[] | any;
  total: number;
  currentPage: number;
  itemsPerPage?: number;
  debounceTime?: number;
  previousPageCallback: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  nextPageCallback: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  searchCallback?: (e: ChangeEvent<HTMLInputElement>) => void;
  rightAccessory?: ReactNode;
  props?: any;
} & ComponentProps<"div">;

export const ServerTable = ({
  className,
  searchable = true,
  stripped = true,
  isLoading = false,
  data,
  columns,
  total,
  currentPage,
  itemsPerPage = 10,
  debounceTime = 300,
  previousPageCallback,
  nextPageCallback,
  searchCallback,
  rightAccessory,
  ...props
}: ServerTableProps): JSX.Element => {
  const [tableData, setTableData] = useState(data);
  const [filter, setFilter] = useState("");
  const numberOfPages = Math.ceil(total / itemsPerPage);
  const disablePrevious = currentPage === 1;
  const disableNext = currentPage === numberOfPages;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounce = useRef<any>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLoading]);

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

  if (isLoading) {
    return (
      <TableSkeleton
        itemsPerPage={itemsPerPage}
        headersCount={columns.length}
      />
    );
  }

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
      <div className="flex">
        {searchable && (
          <Input
            data-testid="table-search"
            className="m-2 w-1/4"
            placeholder="Search..."
            onChange={(e) => {
              const value = e.target.value;
              setFilter(value);

              clearTimeout(searchDebounce.current);
              searchDebounce.current = setTimeout(() => {
                searchCallback ? searchCallback(e) : undefined;
              }, debounceTime);
            }}
            value={filter}
            ref={searchInputRef}
          />
        )}
        {rightAccessory}
      </div>

      <div className="w-full text-sm text-left text-gray-500">
        <div className="text-xs text-gray-700 uppercase bg-gray-300 flex">
          {renderHeaders()}
        </div>
        <div>{renderRows()}</div>
      </div>
      <div className="flex m-2 justify-between">
        <p className="m-2">
          Page {currentPage} of {numberOfPages}
        </p>
        <div className="flex gap-2">
          <Button
            data-testid="previous-button"
            variant="outlined"
            color="gray"
            onClick={previousPageCallback}
            disabled={disablePrevious}
          >
            <FaArrowLeft />
            Previous
          </Button>
          <Button
            data-testid="next-button"
            variant="outlined"
            color="gray"
            onClick={nextPageCallback}
            disabled={disableNext}
          >
            Next
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
