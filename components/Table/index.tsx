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
import { Heading, Text } from "@components/Typography";
import { FilterButton } from "./components/filterButton";
import { StyledTable, TableContainer, TableWrapper } from "./styled";

/* Types */
import type { TableInstance, Column } from "react-table";
import type { SortByItem } from "./types";
import { Searchbar } from "@components/Searchbar";
import { RawInput } from "@components/Input";
import { Pagination } from "./components/pagination";

interface Props {
  cols: Array<Column>;
  rows: Record<string, unknown>[];
  title?: string;
  onRowClick?: (original: Object) => void;
  // isColoumnWidthEqual?: boolean;
  // isSearchable?: boolean;
  // searchPlaceholder?: string;
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
  // searchPlaceholder,
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
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  const { state, setPageSize } = table;

  return (
    <TableWrapper>
      <div className="flex justify-between">
        <Heading size="2xl" weight="600">
          {title || " "}
        </Heading>
        <div className="flex gap-4">
          <Searchbar />
          <FilterButton onClick={() => {}} />
        </div>
      </div>
      <TableContainer>
        <StyledTable {...table.getTableProps()}>
          <TableHead table={table} />
          <TableBody table={table} onRowClick={onRowClick} />
        </StyledTable>
      </TableContainer>
      <Pagination table={table} />
    </TableWrapper>
  );
};
