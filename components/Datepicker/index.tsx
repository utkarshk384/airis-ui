import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<Date[]>([new Date()]);

  return (
    <DayPicker
      onDayClick={(day) => setSelectedDay([day])}
      selected={selectedDay as any}
      showOutsideDays={showOutsideDays}
      className="p-3"
      captionLayout="dropdown"
      fromYear={2015}
      toYear={2025}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        // caption_label: "text-sm font-medium",
        nav: "space-x-1 left-0 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        // table: "w-full border-collapse space-y-1",
        // head_row: "flex",
        button_reset: "absolute",
        // head_cell:
        //   "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // row: "flex w-full mt-2",
        // cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        // day_selected:
        //   "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // day_today: "bg-accent text-accent-foreground",
        // day_outside: "text-muted-foreground opacity-50",
        // day_disabled: "text-muted-foreground opacity-50",
        // day_range_middle:
        //   "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-6 w-6" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-6 w-6" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar as Datepicker };
