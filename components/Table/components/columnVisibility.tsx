import React, { useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button } from "@components/Button";
import { Dropdown } from "@components/Dropdown";

/* Types */
import type { TableComponent } from "../types";

type Props = {
  children?: React.ReactNode;
} & TableComponent;

export const ColumnVisibility: React.FC<Props> = (props) => {
  const { table } = props;

  const { allColumns, columns } = table;

  const [hideableCols, setHideableCols] = useState(allColumns);

  useEffect(() => {
    const cols = [];
    for (const col of columns) if (!(col as any).disableHiding) cols.push(col);

    setHideableCols(cols);
  }, [columns]);

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
          {hideableCols.map((column) => (
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
