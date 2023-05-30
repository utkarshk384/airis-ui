import { keyframes, styled } from "@/styles/stitches";
import * as Dialog from "@radix-ui/react-dialog";
import { DRAWER_SIZES } from "./consts";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const StyledDrawerHeader = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "$primary",
  color: "$white",
  zIndex: 10,
  position: "sticky",
  top: 0,
});

export const StyledOverlay = styled(Dialog.Overlay, {
  backgroundColor: "#00000080",
  position: "fixed",
  inset: 0,
  zIndex: 20,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const StyledContent = styled(Dialog.Content, {
  backgroundColor: "$white",
  borderRadius: 8,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: 0,
  right: 0,
  width: "40vw",
  height: "100vh",
  zIndex: 20,
  overflowY: "scroll",

  "&:focus": { outline: "none" },

  variants: {
    size: DRAWER_SIZES,
  },
});
