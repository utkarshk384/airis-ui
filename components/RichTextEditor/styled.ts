import { css, styled } from "@/styles/stitches";

export const StyledToolbar = styled("div", {
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
});

export const QuillCSS = css({
  /* Round container */
  ".ql-toolbar.ql-snow": {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },

  ".ql-toolbar": {
    border: "1px solid var(--border-color) !important",
    borderBottom: "none !important",
  },

  ".ql-container": {
    border: "1px solid var(--border-color) !important",
    borderTop: "1px solid #ccc !important",
    borderEndStartRadius: "8px",
    borderEndEndRadius: "8px",
    height: "var(--height, auto) !important",
    gridTemplateColumns: "1fr 1fr",
  },

  /* Remove second chevron from dropdown */
  "svg > polygon:last-child": {
    display: "none",
  },

  /* Move the first chevron up. */
  "svg > polygon:first-child": {
    transform: "translateY(-20%)",
  },

  /* Target Dropdown menu */
  ".ql-picker-options": {
    borderRadius: "8px",
  },

  /* Remove gray border from dropdown when dropdown is open */
  ".ql-picker-label": {
    borderColor: "transparent !important",
  },

  /* Select background color dropdown menu and it's items. */
  ":is(.ql-background.ql-expanded, .ql-color.ql-expanded) > .ql-picker-options":
    {
      width: "fit-content !important",
      padding: "0.5rem",
      display: "grid !important",
      gridTemplateColumns: "repeat(7, 2rem)",
      gap: "0.25rem",
    },
  ":is(.ql-background, .ql-color) > .ql-picker-options > span.ql-picker-item": {
    width: "2rem !important",
    height: "2rem !important",
    borderRadius: "8px",
  },

  variants: {
    scorllable: {
      ".ql-container": {
        overflowY: "scroll",
      },
    },
  },
});
