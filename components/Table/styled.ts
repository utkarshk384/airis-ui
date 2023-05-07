import { styled } from "@/styles/stitches";

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
  borderCollapse: "collapse",
  overflow: "scroll",
});

export const StyledTableHead = styled("thead", {
  color: "$primary",
  fontSize: "$base",
  fontWeight: "$700",
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
