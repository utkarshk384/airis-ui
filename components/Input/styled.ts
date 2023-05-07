import { styled } from "@/styles/stitches";

export const StyledInput = styled("input", {
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  width: "100%",

  "&:placeholder": {
    color: "$grey",
  },

  "&:focus": {
    outline: "$accent 1px solid",
  },

  variants: {
    variant: {
      underlined: {
        borderRadius: 0,
        border: "none",
        borderBottom: "1px solid $grey",
        "&:focus": {
          outline: "none",
          borderBottom: "$accent 1px solid",
        },
      },
      filled: {
        border: "1px solid $grey",

        "&:placeholder": {
          color: "$grey",
        },

        "&:focus": {
          outline: "$accent 1px solid",
        },
      },
    },
  },
});
