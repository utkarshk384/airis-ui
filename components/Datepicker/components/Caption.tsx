import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

/* Components */
import { Button, Heading, Select } from "@components";

/* Utils */
import { FormatDate, ParseStringDate } from "@utils/dates-fns";
import { GetYearMonthDropdown } from "./utils";

/* Types */
import type { CaptionProps } from "react-day-picker";

type Props = CaptionProps;

type ChangeMonthButtonProps = {
  children: React.ReactNode;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  month?: Date;
  state: ReturnType<typeof useMonthYear>;
};

const useMonthYear = (date: Date) => {
  const [month, SetMonth] = useState(FormatDate(date, "MMMM"));
  const [year, SetYear] = useState(FormatDate(date, "yyyy"));

  const { goToDate } = useNavigation();

  const setMonth = (newDate: Date) => {
    SetMonth(FormatDate(newDate, "MMMM"));
    goToDate(newDate);
  };

  const setYear = (newDate: Date) => {
    SetYear(FormatDate(newDate, "yyyy"));
    goToDate(newDate);
  };

  return { month, year, setMonth, setYear };
};

export const Caption: React.FC<Props> = (props) => {
  const { displayMonth } = props;

  const { nextMonth, previousMonth } = useNavigation();

  const state = useMonthYear(displayMonth);
  const [stringMonth, setStringMonth] = useState(
    FormatDate(new Date(), "MMMM")
  );
  const [stringYear, setStringYear] = useState(FormatDate(new Date(), "yyyy"));

  const DropdownOptions = useMemo(() => GetYearMonthDropdown(), []);

  useEffect(() => {
    state.setMonth(displayMonth);
    state.setYear(displayMonth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMonth]);

  /* Handlers */
  const handleMonthChange = (val: string) => {
    const parsed = ParseStringDate(val, "MMMM");
    setStringMonth(val);
    state.setMonth(parsed);
  };

  const handleYearChange = (val: string) => {
    const parsed = ParseStringDate(val, "yyyy");
    setStringYear(val);
    state.setYear(parsed);
  };

  const SelectSharedProps = useMemo(
    () => ({
      menuPlacement: "center" as const,
      dropdownIconSize: 18,
      unstyled: true,
    }),
    []
  );

  return (
    <div className="flex justify-between">
      <ChangeMonthButton
        setYear={setStringYear}
        setMonth={setStringMonth}
        state={state}
        month={previousMonth}
      >
        <ChevronLeftIcon width={24} height={24} />
      </ChangeMonthButton>
      <div className="grid grid-cols-[2fr_1fr] px-2">
        <Select
          {...SelectSharedProps}
          value={stringMonth}
          onChange={(val) => handleMonthChange(val.label)}
          name="datepicker-month"
          options={DropdownOptions.months}
          defaultValue={DropdownOptions.months.find(
            (m) => m.label === state.month
          )}
        />
        <Select
          {...SelectSharedProps}
          onChange={(val) => handleYearChange(val.label)}
          value={stringYear}
          name="datepicker-year"
          options={DropdownOptions.years}
          defaultValue={DropdownOptions.years.find(
            (y) => y.label === state.year
          )}
        />
      </div>
      <ChangeMonthButton
        setYear={setStringYear}
        setMonth={setStringMonth}
        state={state}
        month={nextMonth}
      >
        <ChevronRightIcon width={24} height={24} />
      </ChangeMonthButton>
    </div>
  );
};

const ChangeMonthButton: React.FC<ChangeMonthButtonProps> = (props) => {
  const { month, state, setMonth, setYear } = props;
  const { goToMonth } = useNavigation();

  const handler = () => {
    if (!month) return;
    setYear(FormatDate(month, "yyyy"));
    setMonth(FormatDate(month, "MMMM"));

    state.setYear(month);
    state.setMonth(month);
    goToMonth(month);
  };

  return (
    <Button disabled={!month} onClick={handler} variant="icon" iconButton>
      {props.children}
    </Button>
  );
};
