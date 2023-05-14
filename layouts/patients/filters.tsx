import { useMemo } from "react";
import { Select } from "@components/Select";

/* Types */
import type { DropdownOption } from "@components/sharedTypes";
import type { FilterComponentProps } from "@components/types";

export const DropdownContent: React.FC<FilterComponentProps> = (props) => {
  const { Dropdown, table } = props;

  const statusOption: DropdownOption[] = useMemo(
    () => [
      {
        label: "All",
        value: "All",
      },
      {
        label: "Completed",
        value: "completed",
      },
      {
        label: "In Progress",
        value: "In Progress",
      },
      {
        label: "Not Started",
        value: "Not Started",
      },
    ],
    []
  );

  const { setFilter } = table;

  return (
    <div className="flex flex-col w-full px-4">
      <Dropdown.Label>Status</Dropdown.Label>
      <Select
        options={statusOption}
        onChange={(val) =>
          setFilter("status", val.value === "All" ? "" : val.value)
        }
        defaultValue={statusOption[0]}
      />
    </div>
  );
};
