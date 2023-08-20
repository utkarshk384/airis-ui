import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

/* Components */
import { Caption } from "./components/Caption";
import {
  CellCSS,
  DayCSS,
  DaySelectedCSS,
  DayTodayCSS,
  HeadCellCSS,
  TableCSS,
} from "./styled";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

type Props = {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
} & Omit<CalendarProps, "onSelect">;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  defaultValue = new Date(),
  onChange,
  ...props
}: Props) {
  const [selectedDay, setSelectedDay] = useState<Date[]>([defaultValue]);

  return (
    <DayPicker
      onDayClick={(day) => {
        setSelectedDay([day]);
        onChange?.(day);
      }}
      selected={selectedDay as any}
      showOutsideDays={showOutsideDays}
      className="p-4 w-full m-0"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 flex flex-col items-center",
        table: TableCSS(),
        head_row: "flex",
        head_cell: HeadCellCSS(),
        row: "flex w-full mt-2",
        cell: CellCSS(),
        day_today: DayTodayCSS(),
        day: DayCSS(),
        day_selected: DaySelectedCSS(),
        day_outside: "text-grey-400 opacity-50",
        day_disabled: "text-grey-400 opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      defaultMonth={defaultValue}
      captionLayout="dropdown-buttons"
      fromYear={2015}
      toYear={2025}
      components={{ Caption }}
      {...props}
      mode="single"
      onSelect={(day) => {
        setSelectedDay([day as Date]);
        onChange?.(day as Date);
      }}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar as Datepicker };
