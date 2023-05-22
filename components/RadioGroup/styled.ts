import { styled } from "@/styles/stitches";

import { RADIO_ITEM_FLOW } from "./consts";

export const StyledRadio = styled("label", {
  display: "block",
});

export const StyledContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",

  variants: {
    itemFlow: RADIO_ITEM_FLOW,
  },
});
