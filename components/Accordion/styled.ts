import { css, keyframes, styled } from "@/styles/stitches";
import * as Expandable from "@radix-ui/react-accordion";

export const ChevronRotate = css({
  "&[data-state='open'] > #chevron": {
    transform: "rotate(90deg)",
  },

  "#chevron": {
    transition: "transform 300ms",
  },
});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

export const StyledAccordionContent = styled(Expandable.Content, {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  "&[data-state='open']": {
    borderTop: "1px solid hsla(220, 13%, 91%, 1)",
  },

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms ease-in-out`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms ease-in-out`,
  },
});

export const StyledAccordionItem = styled(Expandable.Item, {
  "&:not(:last-child)": {
    marginBottom: "1rem",
  },
  borderTop: "2px solid hsla(220, 13%, 91%, 1)",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px 0px hsla(0, 0%, 0%, 0.25)",
  overflow: "hidden",
});

export const StyledAccordionTrigger = styled(Expandable.Trigger, {
  display: "flex",
  alignItems: "center",
  width: "100%",
});
