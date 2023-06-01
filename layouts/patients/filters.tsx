import { useMemo } from "react";
import { Select } from "@components/Select/Single";
import { DayPicker } from "react-day-picker";

/* Types */
import type { DropdownOption } from "@components/sharedTypes";
import type { TableComponent } from "@components/types";
import { Datepicker, DropdownButton } from "@components";
import { FunnelIcon } from "@heroicons/react/20/solid";

export const DropdownContent: React.FC<TableComponent> = (props) => {
  const { table } = props;

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
    <DropdownButton
      dropdownContentProps={{
        className: "w-96",
        side: "left",
        alignOffset: 45,
        sideOffset: -40,
        align: "start",
      }}
      DropdownContent={(Dropdown) => (
        <>
          <div className="flex flex-col min-h-[24rem] !w-[24rem] p-4 gap-4">
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
            <div className="gap-2 flex flex-col">
              <Dropdown.Label>Visit Date</Dropdown.Label>
              <Datepicker />
            </div>
          </div>
        </>
      )}
      variant="solid"
      iconButton
    >
      <FunnelIcon width={24} height={24} />
    </DropdownButton>
  );
};
