import { styled } from "@stitches/react";
import * as RadixSwitch from "@radix-ui/react-switch";

export const StyledSwitch = styled(RadixSwitch.Root, {
  width: "2.5rem",
  height: "1.5rem",
  display: "flex",
  position: "relative",
  borderRadius: "15px",
  "&[data-state='checked']": {
    background: "#22B472",
  },
});

export const StyledThumb = styled(RadixSwitch.SwitchThumb, {
  display: "block",
  height: "1.3rem",
  width: "1.3rem",
  transform: "translate(2px, 1px)",
  borderRadius: "100%",
  background: "white",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
  transition: "transform 100ms",
  willChange: "transform",
  "&[data-state='checked']": {
    transform: "translate(17px, 1px)",
  },
});
