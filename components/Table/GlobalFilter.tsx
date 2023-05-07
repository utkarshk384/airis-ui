import React, { useState } from "react";

/* Components */
import { Searchbar } from "@components/Searchbar";
import { useAsyncDebounce } from "react-table";

/* Types */
import type { TableComponent } from "./types";

type Props = {
  children?: React.ReactNode;
  searchPlaceholder?: string;
} & TableComponent;

export const GlobalFilter: React.FC<Props> = (props) => {
  const { table, searchPlaceholder } = props;
  const {
    preGlobalFilteredRows,
    state: { globalFilter },
    setGlobalFilter,
  } = table;

  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  // TODO: Add Debounce Event
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

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
