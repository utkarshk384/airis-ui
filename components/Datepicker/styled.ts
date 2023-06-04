import { css } from "@/styles/stitches";

export const TableCSS = css({
  width: "fit-content",
  borderCollapse: "collapse",
  marginTop: "0.25rem",
});

export const DayCSS = css({
  borderRadius: "8px",
  padding: "0.25rem",
  width: "2rem",
  height: "2rem",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: "rgba($rgbAccent, 0.25)",
  },
});

export const HeadCellCSS = css({
  width: "2.25rem",
  fontWeight: "$400",
  fontSize: "$sm",
  color: "$grey",
});

export const CellCSS = css({
  width: "2.25rem",
  textAlign: "center",
  padding: 0,
  position: "relative",
  "&:has([aria-selected])": {
    backgroundColor: "$accent",
  },

  fontWeight: "$400",
  fontSize: "$sm",
});

export const DayTodayCSS = css({
  backgroundColor: "rgba($rgbSecondary, 0.45)",
  color: "$black",
  fontWeight: "$500",
});

export const DaySelectedCSS = css({
  backgroundColor: "$accent",
  color: "$white",
  fontWeight: "$500",

  "&:hover, &:focus": {
    backgroundColor: "$accent !important",
  },
});
