import React, { useEffect, useMemo, useState } from "react";
import { Select } from "@components/Select/Single";
import { FunnelIcon } from "@heroicons/react/20/solid";

/* Components */
import { CalendarIcon, Datepicker, DropdownButton, Text } from "@components";

/* APIs */
import { usePatientList } from "@src/api";

/* Types */
import type { TableComponent } from "@components/types";
import type { DropdownOption } from "@components/sharedTypes";
import { FormatDate } from "@utils/dates-fns";

type Props = {} & TableComponent;

export const DropdownContent: React.FC<Props> = (props) => {
  const { table } = props;

  const { setReferenceDate } = usePatientList();

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

  const {
    setFilter,
    state: { filters },
  } = table;

  const statusDefaultValue = useMemo(() => {
    const filter = filters.find((filter) => filter.id === "status");
    if (!filter) return statusOption[0];

    return statusOption.find((option) => option.value === filter.value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const vistDateDefaultValue = useMemo(() => {
    return (
      filters.find((filter) => filter.id === "visit_time")?.value || undefined
    );
  }, [filters]);

  /* States */
  const [visitTime, setVisitTime] = useState<string>(
    FormatDate(vistDateDefaultValue, "MMM dd")
  );

  return (
    <>
      <DropdownButton
        variant="outline"
        dropdownContentProps={{
          className: "w-96",
          side: "left",
          alignOffset: 45,
          sideOffset: -100,
          align: "start",
        }}
        DropdownContent={(Dropdown) => (
          <>
            <Datepicker
              defaultValue={vistDateDefaultValue}
              mode="single"
              onChange={(day) => {
                setFilter("visit_time", day);
                setVisitTime(FormatDate(day, "MMM dd"));
                setReferenceDate(day);
              }}
            />
          </>
        )}
      >
        <div className="flex gap-4 justify-center">
          <CalendarIcon className="fill-accent" />
          <Text color="accent" size="sm">
            {visitTime}
          </Text>
        </div>
      </DropdownButton>

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
                  defaultValue={statusDefaultValue}
                />
              </div>
            </div>
          </>
        )}
        variant="solid"
        iconButton
      >
        <FunnelIcon width={24} height={24} />
      </DropdownButton>
    </>
  );
};
