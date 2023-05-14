import { styled } from "@/styles/stitches";
import { CalendarDay } from "calendar-blocks";

const CalendarGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(7, 32px)",
  gridAutoRows: "32px",
  // it's good practice to prevent page jumping when switching to a month
  // with more rows...
  height: "calc(32px * 7)",
  borderRadius: "8px",
  overflow: "hidden",
  padding: "6px",
  backgroundColor: "#fafcfe",
});

const Day = styled(CalendarDay, {
  border: "1px solid transparent",
  backgroundColor: "transparent",

  borderRadius: 0,
  // border collapse
  marginRight: -1,
  marginBottom: -1,
  // keep above blank days
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "0.2s ease background-color, 0.2s ease border",
  cursor: "pointer",

  "&[data-weekend]": {
    backgroundColor: "#faffff",
  },
  "&[data-highlighted]": {
    zIndex: 1,
    outline: "#ecce1f auto 1px",
  },
  "&[data-selected]": {
    backgroundColor: "#20b0ae",
    color: "#fff",
  },
  "&[data-in-range]": {
    backgroundColor: "#e0ffff",
  },
  "&[data-range-start]": {
    backgroundColor: "#20b0ae",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
  },
  "&[data-range-end]": {
    backgroundColor: "#20b0ae",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "default",
  },
  "&[data-today]::before": {
    content: '""',
    position: "absolute",
    top: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: "100%",
    backgroundColor: "#ecce1f",
  },
  "&[data-top-edge]": {
    borderTop: "1px solid rgba(0,20,80, 0.5)",
  },
  "&[data-bottom-edge]": {
    borderBottom: "1px solid rgba(0,20,80, 0.5)",
  },
  "&[data-first-column]": {
    borderLeft: "1px solid rgba(0,20,80, 0.5)",
  },
  "&[data-last-column]": {
    borderRight: "1px solid rgba(0,20,80, 0.5)",
  },
  "&[data-day-first]": {
    borderLeft: "1px solid rgba(0,20,80, 0.5)",
    borderTopLeftRadius: "8px",
  },
  "&[data-day-last]": {
    borderRight: "1px solid rgba(0,20,80, 0.5)",
    borderBottomRightRadius: "8px",
  },

  // round the corners!
  "&[data-first-column][data-bottom-edge]": {
    borderBottomLeftRadius: "8px",
  },
  "&[data-last-column][data-bottom-edge]": {
    borderBottomRightRadius: "8px",
  },
  "&[data-first-column][data-top-edge]": {
    borderTopLeftRadius: "8px",
  },
  "&[data-last-column][data-top-edge]": {
    borderTopRightRadius: "8px",
  },

  "&[data-different-month]": {
    visibility: "hidden",
  },
});

const MonthsLayout = styled("div", {
  display: "grid",
  gridTemplateAreas:
    '"prevMonth leftMonth rightMonth nextMonth" "leftGrid leftGrid rightGrid rightGrid"',
  gridTemplateColumns: "auto 1fr 1fr auto",
  gridTemplateRows: "auto 1fr",
  gridGap: "1rem",
});

const MonthLabel = styled("label", {
  textAlign: "center",
  fontWeight: "bold",
});

const MonthButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100%",
});

const DayLabel = styled("label", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8em",
});

export const Styled = () => {
  return <></>;
};

Styled.Day = Day;
Styled.DayLabel = DayLabel;
Styled.MonthLabel = MonthLabel;
Styled.MonthButton = MonthButton;
Styled.CalendarGrid = CalendarGrid;
Styled.MonthsLayout = MonthsLayout;
