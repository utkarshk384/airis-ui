import { styled } from "@/styles/stitches";
import { BadgeSizes, ColorVariants } from "./consts";

export const StyledBadge = styled("div", {
  fontSize: "$base",
  display: "grid",
  placeItems: "center",
  borderRadius: "8px",
  fontWeight: "$600",
  padding: "0.25rem",
  width: "max-content",

  variants: {
    color: ColorVariants,
    size: BadgeSizes,
  },
});
