import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";

/* Consts */
import { ROW_OPTIONS } from "./consts";

/* Components */
import { TableHead } from "./components/head";
import { TableBody } from "./components/body";
import { Heading } from "@components/Typography";
import { Pagination } from "./components/pagination";
import { GlobalFilter } from "./components/GlobalFilter";
import { ColumnVisibility } from "./components/columnVisibility";

import {
  StyledTable,
  TableWrapper,
  TableContainer,
  TableComponentContainer,
} from "./styled";

/* Types */
import type { DefaultFilter } from "./types";
import type { Column, TableInstance } from "react-table";
interface Props {
  children?: React.ReactNode | ((table: TableInstance) => React.ReactNode);
  cols: Array<Column>;
  rows: Record<string, unknown>[];
  title?: string;
  onRowClick?: (original: Object) => void;
  hasStickyHeader?: boolean;
  searchPlaceholder?: string;
  defaultFilters?: DefaultFilter[];
  searchClassName?: string;
  errorHeading?: string;
  errorText?: string;
}

export const Table: React.FC<Props> = (props) => {
  const {
    cols,
    rows: Data,
    hasStickyHeader = true,
    children,
    defaultFilters,
    errorHeading,
    errorText,
  } = DefaultProps(props);

  /* Memos */
  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => Data, [Data]);
  const defaultValue = useMemo(() => ROW_OPTIONS[1], []);

  const table = useTable(
    {
      columns: columns as Column<Record<string, unknown>>[],
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultValue.value,
        filters: defaultFilters,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <TableComponentContainer>
      <div className="grid grid-cols-2">
        <Heading size="2xl" className="mt-1" weight="600">
          {props.title}
        </Heading>

        <div className="flex w-full gap-4 justify-end">
          <GlobalFilter
            table={table}
            searchPlaceholder={props.searchPlaceholder}
            searchClassName={props.searchClassName}
          />
          {children instanceof Function ? children(table) : children}
          {/* <FilterButton
            table={table}
            FilterComponent={FilterComponent}
            onClick={() => {}}
          /> */}
          <ColumnVisibility table={table} />
        </div>
      </div>
      <TableWrapper>
        <TableContainer>
          <StyledTable {...table.getTableProps()}>
            <TableHead hasStickyHeader={hasStickyHeader} table={table} />
            <TableBody
              errorHeading={errorHeading}
              errorText={errorText}
              table={table}
              onRowClick={props.onRowClick}
            />
          </StyledTable>
        </TableContainer>
      </TableWrapper>
      <Pagination table={table} defaultValue={defaultValue} />
    </TableComponentContainer>
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps = {
    ...props,
    errorHeading: props.errorHeading || "Oops, Nothing was Found!",
    defaultFilters: props.defaultFilters || [],
    title: props.title || "",
    hasStickyHeader: props.hasStickyHeader || true,
    searchClassName: props.searchClassName || "",
  };

  return defaultProps as typeof defaultProps;
};
