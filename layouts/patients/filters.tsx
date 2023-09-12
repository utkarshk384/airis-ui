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

type Props = {
  referenceDate: Date;
  setReferenceDate: React.Dispatch<React.SetStateAction<Date>>;
} & TableComponent;

export const DropdownContent: React.FC<Props> = (props) => {
  const { table, setReferenceDate, referenceDate } = props;

  const {
    setFilter,
    state: { filters },
  } = table;

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

  const statusDefaultValue = useMemo(() => {
    const filter = filters.find((filter) => filter.id === "status");
    if (!filter) return statusOption[0];

    return statusOption.find((option) => option.value === filter.value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const visitTime = useMemo(
    () => FormatDate(referenceDate, "MMM dd"),
    [referenceDate]
  );

  /* Effects */
  useEffect(() => {
    if(!table.state.globalFilter) return;

    
  }, [table.state.globalFilter])

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
        DropdownContent={(Dropdown) => {
          const { setDropdownOpen } = Dropdown.Context();
          return (
            <>
              <Datepicker
                defaultValue={referenceDate}
                mode="single"
                onChange={(day) => {
                  setDropdownOpen(false);
                  setReferenceDate(day);
                }}
              />
            </>
          );
        }}
      >
        <div className="flex justify-center gap-4">
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
              <div className="flex flex-col gap-2">
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
