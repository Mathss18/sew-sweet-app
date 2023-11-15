import React, { ComponentProps } from "react";
import { Input } from "../..";

export type Props = {
  columnFilters: any;
  setColumnFilters: (value: any) => void;
  searchFieldName: string;
} & ComponentProps<"input">;

export const Filter = ({
  className,
  columnFilters,
  setColumnFilters,
  searchFieldName,
}: Props): JSX.Element => {
  const filterName =
    columnFilters.find((filter: any) => filter.id === searchFieldName)?.value ||
    "";

  const onFilterChange = (id: any, value: any) =>
    setColumnFilters((prev: any) =>
      prev
        .filter((filter: any) => filter.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <div className={className}>
      <Input
        placeholder="Search..."
        onChange={(e) => onFilterChange(searchFieldName, e.target.value)}
        value={filterName}
      />
    </div>
  );
};
