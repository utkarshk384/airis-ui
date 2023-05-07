import React from "react";

/* Components */
import { StyledTableDetail, StyledTableRow } from "../styled";

/* Types */
import type { TableComponent } from "../types";

type Props = {
  onRowClick?: (original: Object) => void;
} & TableComponent;

export const TableBody: React.FC<Props> = (props) => {
  const { table, onRowClick } = props;

  const { getTableBodyProps, prepareRow, page } = table;
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          // eslint-disable-next-line react/jsx-key
          <StyledTableRow
            {...row.getRowProps()}
            className="border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onRowClick && onRowClick(row.original)}
          >
            {row.cells.map((cell, i) => (
              // eslint-disable-next-line react/jsx-key
              <StyledTableDetail {...cell.getCellProps()}>
                {cell.render("Cell")}
              </StyledTableDetail>
            ))}
          </StyledTableRow>
        );
      })}
    </tbody>
  );
};
