import type { TableInstance, Column, HeaderGroup } from "react-table";
export type ColumnType = Column;

export interface SortByItem {
  isDescending: boolean;
  column: string;
  label: string;
}

export type TableComponent<T extends Record<string, unknown> = {}> = {
  table: TableInstance<T>;
};
