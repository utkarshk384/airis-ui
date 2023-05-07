import React, { useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

/* Hooks */

/* Components */
import { TableHead } from "./components/head";
import { TableBody } from "./components/body";
import { GlobalFilter } from "./GlobalFilter";
import { Heading } from "@components/Typography";
import { Pagination } from "./components/pagination";
import { FilterButton } from "./components/filterButton";
import {
  StyledTable,
  TableComponentContainer,
  TableContainer,
  TableWrapper,
} from "./styled";

/* Types */
import type { Column } from "react-table";

interface Props {
  cols: Array<Column>;
  rows: Record<string, unknown>[];
  title?: string;
  onRowClick?: (original: Object) => void;
  // isColoumnWidthEqual?: boolean;
  // isSearchable?: boolean;
  searchPlaceholder?: string;
  // sortByArray?: SortByItem[];
  // FilterComponent?: React.FC<TableInstance<{}>> | null;
  // filterArray?: {
  //   label: string;
  //   column: string;
  //   updater: number[] | string | number;
  // }[];
}

// Define a default UI for filtering
function DefaultColumnFilter() {
  return <></>;
}

export const Table: React.FC<Props> = ({
  cols,
  rows: Data,
  onRowClick,
  title,
  // isColoumnWidthEqual,
  // isSearchable = true,
  searchPlaceholder,
  // sortByArray = null,
  // FilterComponent = null,
  // filterArray,
}) => {
  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => Data, [Data]); // no rerender because of this

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const table = useTable(
    {
      columns: columns as Column<Record<string, unknown>>[],
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { state, setPageSize } = table;

  return (
    <TableComponentContainer>
      <div className="grid grid-cols-3">
        <Heading size="2xl" weight="600">
          {title || " "}
        </Heading>
        <div></div>
        <div className="flex w-full gap-4 justify-self-end">
          <GlobalFilter table={table} searchPlaceholder={searchPlaceholder} />
          <FilterButton onClick={() => {}} />
        </div>
      </div>
      <TableWrapper>
        <TableContainer>
          <StyledTable {...table.getTableProps()}>
            <TableHead table={table} />
            <TableBody table={table} onRowClick={onRowClick} />
          </StyledTable>
        </TableContainer>
      </TableWrapper>
      <Pagination table={table} />
    </TableComponentContainer>
  );
};
