import React, { useCallback, useState } from "react";
import { Calendar, CalendarDays } from "calendar-blocks";

/* Components */
import { Styled } from "./styled";

type Props = {
  children?: React.ReactNode;
};

type DateState = {
  month: number;
  year: number;
};

type useViewInfoReturn = [DateState, (state: DateState) => void];

export const useViewInfo = (month: number, year: number): useViewInfoReturn => {
  const [viewInfo, setViewInfo] = useState<DateState>({
    month,
    year,
  });

  return [viewInfo, setViewInfo];
};

export interface ExampleProps {
  viewInfo: useViewInfoReturn[0];
  setViewInfo: useViewInfoReturn[1];
  rangeValue: { start: Date | null; end: Date | null };
  onRangeValueChange?: (value: {
    start: Date | null;
    end: Date | null;
  }) => void;
}

const DayLabels = () => {
  return (
    <>
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <Styled.DayLabel key={index}>{day}</Styled.DayLabel>
      ))}
    </>
  );
};

export const Datepicker: React.FC<ExampleProps> = ({
  viewInfo: { month, year },
  setViewInfo,
  rangeValue,
  onRangeValueChange,
}) => {
  const onMonthChange = useCallback(
    ({ month: newMonth, year: newYear }: DateState) => {
      if (newMonth === month + 1 && newYear === year) {
        return; // ignore movement from the first to the second frame
      }

      setViewInfo({
        month: newMonth,
        year: newYear,
      });
    },
    [setViewInfo, month, year]
  );

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // used for the two-calendar demo
  const nextMonth = new Date(year, month + 1);
  const nextMonthLabel = nextMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Calendar
      displayMonth={month}
      displayYear={year}
      onDisplayChange={onMonthChange}
      // rangeValue={rangeValue}
      // onRangeChange={onRangeValueChange}
    >
      <Styled.MonthsLayout>
        {/* <Styled.MonthButton
          css={{ gridArea: "prevMonth" }}
          onClick={() => {
            setViewInfo((v) => ({ ...v, month: v.month - 1 }));
          }}
        >
          &lt;
        </Styled.MonthButton>
        <Styled.MonthButton
          css={{ gridArea: "nextMonth" }}
          onClick={() => {
            setViewInfo((v) => ({ ...v, month: v.month + 1 }));
          }}
        >
          &gt;
        </Styled.MonthButton> */}
        <Styled.MonthLabel css={{ gridArea: "leftMonth" }}>
          {monthLabel}
        </Styled.MonthLabel>
        <Styled.MonthLabel css={{ gridArea: "rightMonth" }}>
          {nextMonthLabel}
        </Styled.MonthLabel>
        <Styled.CalendarGrid css={{ gridArea: "leftGrid" }}>
          <DayLabels />
          <CalendarDays>
            {(value) => <Styled.Day value={value} key={value.key} />}
          </CalendarDays>
        </Styled.CalendarGrid>
        <Styled.CalendarGrid css={{ gridArea: "rightGrid" }}>
          <DayLabels />
          <CalendarDays monthOffset={1}>
            {(value) => <Styled.Day value={value} key={value.key} />}
          </CalendarDays>
        </Styled.CalendarGrid>
      </Styled.MonthsLayout>
    </Calendar>
  );
};
