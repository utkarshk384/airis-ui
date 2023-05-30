import { useMemo } from "react";
import { Select } from "@components/Select/Single";

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
    <div className="flex flex-col w-full min-h-[18rem] p-4 gap-8">
      <div className="flex gap-2 flex-col">
        <Dropdown.Label>Status</Dropdown.Label>
        <Select
          name="status"
          options={statusOption}
          onChange={(val) =>
            setFilter("status", val.value === "All" ? "" : val.value)
          }
          defaultValue={statusOption[0]}
        />
      </div>
    </div>
  );
};
