import React from "react";
import { EyeIcon } from "@heroicons/react/20/solid";

/* Types */
import { Button } from "@components/Button";
import { Dropdown } from "@components/Dropdown";

/* Types */
import type { TableComponent } from "../types";
import type { ColumnInstance } from "react-table";
import type { MenuType } from "@components/Dropdown";

type Props = {
  children?: React.ReactNode;
} & TableComponent;

export const ColumnVisibility: React.FC<Props> = (props) => {
  const { table } = props;

  const { allColumns, set } = table;

  return (
    <Dropdown
      contentMaxHeight="20rem"
      dropdownContentProps={{
        align: "end",
        side: "bottom",
      }}
      TriggerComponent={TriggerComponent}
    >
      {(Dropdown) => (
        <>
          {allColumns.map((column) => (
            <Dropdown.CheckboxItem
              key={column.id}
              {...column.getToggleHiddenProps()}
            >
              {column.Header as string}
            </Dropdown.CheckboxItem>
          ))}
        </>
      )}
    </Dropdown>
  );
};

const TriggerComponent = () => {
  return (
    <Button as="a" iconButton variant="outline">
      <EyeIcon width={24} height={24} />
    </Button>
  );
};
