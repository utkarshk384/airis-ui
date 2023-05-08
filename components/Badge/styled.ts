import { styled } from "@/styles/stitches";
import { BadgeSizes, ColorVariants } from "./consts";

export const StyledBadge = styled("div", {
  fontSize: "$base",
  display: "grid",
  placeItems: "center",
  borderRadius: "8px",
  fontWeight: "$600",
  padding: "0.625rem 0.3125rem",

  variants: {
    color: ColorVariants,
    size: BadgeSizes,
  },
});
