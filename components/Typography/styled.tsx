import { styled } from "@/styles/stitches";

/* Consts */
import {
  FONT_COLORS,
  FONT_SIZES,
  FONT_TEXT_CASE,
  FONT_WEIGHTS,
} from "./consts";

export const StyledTypography = styled("p", {
  fontFamily: "var(--font-inter)",
  variants: {
    size: FONT_SIZES,
    weight: FONT_WEIGHTS,
    color: FONT_COLORS,
    textCase: FONT_TEXT_CASE,
  },
});
