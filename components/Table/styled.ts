import { css, styled } from "@/styles/stitches";

export const TableComponentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const TableWrapper = styled("div", {
  width: "100%",
  overflow: "hidden",
  borderRadius: "8px",
  border: "1px solid $primary",
  background: "#ffffff",
});

export const TableContainer = styled("div", {
  height: "60vh",
  overflowY: "scroll",
  width: "100%",
});

export const StyledTable = styled("table", {
  width: "100%",
  isolation: "isolate",
  borderCollapse: "collapse",
  overflow: "scroll",
});

export const StyledTableHead = styled("thead", {
  color: "$primary",

  background: "$white",
  fontSize: "$base",
  fontWeight: "$700",
  zIndex: 1,
  variants: {
    sticky: {
      true: {
        position: "sticky",
        top: 0,
        outline: "2px solid $grey",
      },
    },
  },
});

export const StyledTableHeading = styled("th", {
  padding: "0.5rem 1rem",
  textAlign: "left",
  position: "relative",
});

export const StyledTableRow = styled("tr", {
  cursor: "default",
  borderBottom: "1px solid $grey",
  "&:not(:first-child):hover": {
    background: "#EFF6FF",
  },
});

export const StyledTableDetail = styled("td", {
  padding: "0.5rem 1rem",
  fontSize: "$sm",
  color: "$black",
});
