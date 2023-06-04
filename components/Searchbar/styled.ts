import { styled } from "@/styles/stitches";

export const StyledContainer = styled("div", {
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  color: "$grey",
  transition: "all 0.2s ease-in-out",
  "&:focus-within": {
    outline: "$accent 1px solid",
    color: "$accent",
  },
});

export const StyledSearchBar = styled("input", {
  padding: "0.5rem 1rem",
  width: "100%",
  border: "1px solid $grey",
  borderRadius: "8px",

  "&:placeholder": {
    color: "$grey",
  },

  "&:focus": {
    outline: "$accent 1px solid",
  },
});
