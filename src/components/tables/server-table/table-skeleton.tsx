"use client";

import { ComponentProps } from "react";

export type TableSkeletonProps = {
  props?: any;
  itemsPerPage?: number;
  headersCount?: number;
} & ComponentProps<"div">;

export const TableSkeleton = ({
  title,
  className,
  itemsPerPage = 10,
  headersCount = 4,
  ...props
}: TableSkeletonProps): JSX.Element => {
  return (
    <div
      data-testid="table-skeleton"
      className="relative overflow-x-auto sm:rounded-lg shadow animate-pulse"
      {...props}
    >
      <div className="h-6 bg-gray-200 rounded-full w-48 m-2" />

      <div className="w-full text-sm text-left text-gray-500">
        <div className="text-xs text-gray-700 uppercase bg-gray-300 flex">
          <div className="flex flex-grow">
            {Array.from({ length: headersCount }).map((_, index) => (
              <div
                key={index}
                className="py-4 px-4 bg-gray-300 rounded flex-grow"
              >
                <div className="h-6 bg-gray-200 rounded-full w-48" />
              </div>
            ))}
          </div>
        </div>
        <div>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="flex flex-grow">
              {Array.from({ length: headersCount }).map((_, j) => (
                <div
                  key={j}
                  className="py-6 px-4 bg-gray-100 rounded flex-grow"
                >
                  <div className="h-6 bg-gray-200 rounded-full w-48" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex m-2 justify-between">
        <div className="m-2">
          <div className="h-6 bg-gray-200 rounded-full w-32" />
        </div>
        <div className="flex gap-2 m-2">
          <div>
            <div className="h-6 bg-gray-200 rounded-full w-32" />
          </div>
          <div>
            <div className="h-6 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
