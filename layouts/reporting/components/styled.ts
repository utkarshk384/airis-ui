import { styled } from "@/styles/stitches";

export const StyledHeader = styled("div", {
  borderRadius: "8px",
  background: "$primary",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
});

export const BorderedContainer = styled("div", {
  borderRadius: "8px",
  border: "1px solid $black",
  background: "$white",
});

export const StyledIndicator = styled("div", {
  width: "0.5rem",
  height: "0.5rem",
  borderRadius: "999px",

  variants: {
    color: {
      active: {
        backgroundColor: "$green",
      },
      new: {
        backgroundColor: "$blue",
      },
      progress: {
        backgroundColor: "$orange",
      },
      inactive: {
        backgroundColor: "$red",
      },
    },
  },
});
