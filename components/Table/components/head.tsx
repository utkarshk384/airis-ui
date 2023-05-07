/* Components */
import { StyledTableHead, StyledTableHeading, StyledTableRow } from "../styled";

/* Types */
import type { TableComponent } from "../types";

export const TableHead: React.FC<TableComponent> = ({ table }) => {
  const { headerGroups } = table;

  return (
    <StyledTableHead>
      {headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <StyledTableRow
          {...headerGroup.getHeaderGroupProps()}
          className="border-b"
        >
          {headerGroup.headers.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <StyledTableHeading {...column.getHeaderProps()}>
              {column.render("Header")}
            </StyledTableHeading>
          ))}
        </StyledTableRow>
      ))}
    </StyledTableHead>
  );
};
