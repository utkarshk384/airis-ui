import { styled } from "@/styles/stitches";

/* Consts */
import { BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_COLORS } from "./consts";

export const StyledButton = styled("button", {
  width: "fit-content",
  padding: "0.5rem 0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  gap: "4px",
  transition: "all 250ms ease-in-out",

  "&:disabled": {
    cursor: "not-allowed",
  },

  variants: {
    iconButton: {
      true: {
        padding: "0.5rem",
        aspectRatio: "1/1",
      },
    },
    color: BUTTON_COLORS,
    size: BUTTON_SIZES,
    variant: BUTTON_VARIANTS,
    noPadding: {
      true: {
        padding: 0,
      },
    },
  },
});
