import React, { ComponentProps, useEffect, useState } from "react";
import { Input } from "../..";

export type Props = {
  props?: any;
} & ComponentProps<"input">;

export const EditableCell = ({ children, ...props }: Props): JSX.Element => {
  const { getValue, row, column, table }: any = props;
  const initialValue = getValue;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className="w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};
