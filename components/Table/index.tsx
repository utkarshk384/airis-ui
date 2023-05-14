import React, { useMemo, useState } from "react";
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
import { FilterButton } from "./components/filter";
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
import type { Column } from "react-table";
import type { FilterComponentProps } from "./types";

interface Props {
  cols: Array<Column>;
  rows: Record<string, unknown>[];
  title?: string;
  onRowClick?: (original: Object) => void;
  hasStickyHeader?: boolean;
  // isColoumnWidthEqual?: boolean;
  // isSearchable?: boolean;
  searchPlaceholder?: string;
  FilterComponent?: React.FC<FilterComponentProps>;
  // filterArray?: {
  //   label: string;
  //   column: string;
  //   updater: number[] | string | number;
  // }[];
}

function DefaultColumnFilter() {
  return <></>;
}

export const Table: React.FC<Props> = (props) => {
  const {
    cols,
    rows: Data,
    hasStickyHeader = true,
    FilterComponent,
  } = DefaultProps(props);

  /* Memos */
  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => Data, [Data]);
  const defaultValue = useMemo(() => ROW_OPTIONS[1], []);

  const table = useTable(
    {
      columns: columns as Column<Record<string, unknown>>[],
      data,
      initialState: { pageIndex: 0, pageSize: defaultValue.value },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <TableComponentContainer>
      <div className="grid grid-cols-3">
        <Heading size="2xl" weight="600">
          {props.title}
        </Heading>
        <div></div>
        <div className="flex w-full gap-4 justify-self-end">
          <GlobalFilter
            table={table}
            searchPlaceholder={props.searchPlaceholder}
          />
          <FilterButton
            table={table}
            FilterComponent={FilterComponent}
            onClick={() => {}}
          />
          <ColumnVisibility table={table} />
        </div>
      </div>
      <TableWrapper>
        <TableContainer>
          <StyledTable {...table.getTableProps()}>
            <TableHead hasStickyHeader={hasStickyHeader} table={table} />
            <TableBody table={table} onRowClick={props.onRowClick} />
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
    title: props.title || "",
    hasStickyHeader: props.hasStickyHeader || true,
  };

  return defaultProps;
};
