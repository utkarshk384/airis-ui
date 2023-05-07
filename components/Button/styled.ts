import { styled } from "@/styles/stitches";

/* Consts */
import {
  BUTTON_COLORS,
  BUTTON_COMPOUND_VARIANTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "./consts";

export const StyledButton = styled("button", {
  width: "fit-content",
  padding: "0.5rem 0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  gap: "4px",

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
    size: BUTTON_SIZES,
    color: BUTTON_COLORS,
    variant: BUTTON_VARIANTS,
  },

  compoundVariants: BUTTON_COMPOUND_VARIANTS,
});
