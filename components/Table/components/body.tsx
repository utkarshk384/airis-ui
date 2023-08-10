import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

/* Components */
import { Text, Heading } from "@components";
import { StyledTableDetail, StyledTableRow } from "../styled";

/* Animations */
import animationData from "@src/animations/empty-box.json";

/* Types */
import type { TableComponent } from "../types";

type Props = {
  onRowClick?: (original: Object) => void;
  errorHeading: string;
  errorText?: string;
} & TableComponent;

export const TableBody: React.FC<Props> = (props) => {
  const { table, onRowClick } = props;

  const { getTableBodyProps, prepareRow, page } = table;

  return (
    <tbody {...getTableBodyProps({ className: "relative" })}>
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
      {page.length === 0 && (
        <div className="w-full absolute inset-0 m-auto pl-12 pt-44">
          {/* <Player autoplay className="w-64 h-64" src={animationData} loop /> */}
          <div className="flex flex-col items-center gap-2">
            <Heading size="xl" weight="500">
              {props.errorHeading}
            </Heading>
            {props.errorText && <Text>{props.errorText}</Text>}
          </div>
        </div>
      )}
    </tbody>
  );
};
