import React, { useMemo } from "react";
import { FunnelIcon } from "@heroicons/react/20/solid";

/* Components */
import { Select } from "@components/Select";
import { Text } from "@components/Typography";
import { DropdownButton } from "@components/Button";

/* Types */
import type { TableComponent, FilterComponentProps } from "../types";

type Props = {
  children?: React.ReactNode;
  onClick: () => void;
  FilterComponent?: React.FC<FilterComponentProps>;
} & TableComponent;

export const FilterButton: React.FC<Props> = (props) => {
  const { onClick, table, FilterComponent } = props;

  return (
    <DropdownButton
      dropdownContentProps={{
        className: "w-64",
        side: "left",
        alignOffset: 45,
        sideOffset: -40,
        align: "start",
      }}
      DropdownContent={(Dropdown) =>
        FilterComponent ? (
          <FilterComponent Dropdown={Dropdown} table={table} />
        ) : (
          <></>
        )
      }
      variant="solid"
      onClick={onClick}
      iconButton
    >
      <FunnelIcon width={24} height={24} />
    </DropdownButton>
  );
};
