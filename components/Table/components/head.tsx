/* Components */
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
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
            <StyledTableHeading
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <div className="flex gap-2">
                {column.render("Header")}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ChevronDownIcon width={24} height={24} />
                  ) : (
                    <ChevronUpIcon width={24} height={24} />
                  )
                ) : null}
              </div>
            </StyledTableHeading>
          ))}
        </StyledTableRow>
      ))}
    </StyledTableHead>
  );
};
