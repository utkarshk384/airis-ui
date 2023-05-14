import React, { useState } from "react";

/* Components */
import { Searchbar } from "@components/Searchbar";

/* Types */
import type { TableComponent } from "../types";
import { useDebouncedCallback } from "@src/hooks";

type Props = {
  children?: React.ReactNode;
  searchPlaceholder?: string;
} & TableComponent;

export const GlobalFilter: React.FC<Props> = (props) => {
  const { table, searchPlaceholder } = props;
  const {
    state: { globalFilter },
    setGlobalFilter,
  } = table;

  const [value, setValue] = useState(globalFilter);

  const onChange = useDebouncedCallback((value) => {
    setGlobalFilter(value || undefined);
  }, 500);

  return (
    <Searchbar
      placeholder={searchPlaceholder}
      value={value}
      wrapperClassName="w-11/12"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};
