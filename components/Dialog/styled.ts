import { keyframes, styled } from "@/styles/stitches";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DIALOG_SIZES } from "./consts";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const StyledDialogHeader = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "$primary",
  color: "$white",
});

export const DialogTrigger = styled(DialogPrimitive.Trigger, {
  display: "flex",
  alignItems: "center",
  gap: "3px",
  transition: "all 0.3s",
  variants: {
    isVisible: {
      false: {
        visibility: "hidden",
      },
    },
  },
  fontWeight: "$5",
  borderRadius: "6px",
});

export const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "#00000080",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});
export const DialogTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 600,
  fontSize: "$3",
});

export const DialogBody = styled("div", {
  padding: "0 20px 20px 20px",
  backgroundColor: "$mainLayoutBgColor",
});

export const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$white",
  borderRadius: 8,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: 0,
  right: 0,
  width: "40vw",
  height: "100vh",
  zIndex: 9,

  "&:focus": { outline: "none" },

  variants: {
    size: DIALOG_SIZES,
  },
});
