import { styled } from "@/styles/stitches";

/* Consts */
import { VARIANTS } from "./consts";

export const CheckboxInput = styled("input", {
  appearance: "none",
});

export const CheckboxLabel = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  fontSize: "$sm",
  fontWeight: "$400",
  color: "$black",
  border: "none",
  cursor: "pointer",
});

export const CheckboxContainer = styled("div", {
  display: "flex",

  borderRadius: "4px",
  background: "$white",
  height: "1rem",
  aspectRatio: "1/1",
  transition: "all 200ms ease-in-out",

  variants: {
    checked: {
      true: {
        borderColor: "transparent",
        background: "$accent",
        color: "$white",
      },
    },

    variant: VARIANTS,
  },

  compoundVariants: [
    {
      checked: true,
      variant: "borderless",
      css: {
        background: "transparent",
        color: "$black",
      },
    },
  ],
});
