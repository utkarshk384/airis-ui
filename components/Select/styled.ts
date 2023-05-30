import { css, styled } from "@/styles/stitches";

export const ComponentCSS = css({
  "--radius": "0.5rem",
  "--grey-color": "var(--colors-grey)", // Grabbing Stitches grey colors directly.

  ".react-select__control": {
    transition: "border 0.2s ease-in-out",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius)",
    width: "100%",
    border: "1px solid $grey",
  },
  ".react-select__control--is-focused": {
    border: "2px solid $accent",
  },

  ".react-select__placeholder": {
    color: "$grey",
  },

  ".react-select__indicators": {
    display: "flex",
    alignItems: "center",
    gap: "0.05rem",
  },
  ".react-select__menu": {
    background: "white",
    borderRadius: "var(--radius)",
  },
  ".react-select__menu-list": {
    borderRadius: "var(--radius)",
    border: "1px solid $grey",
  },
  ".react-select__option": {
    padding: "0.5rem 1rem",
    transition: "all 250ms ease-in-out",
    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
    "&:hover": {
      background: "rgb(0 0 0 / 10%)",
    },
  },

  /* Multiselect */
  ".react-select__multi-value": {
    background: "$secondary",
    color: "$white",
    padding: "0.25rem 0.5rem",
    borderRadius: "8px",
  },
  ".react-select__multi-value__label": {
    fontSize: "$sm",
  },
  ".react-select__multi-value__remove > svg": {
    width: "1rem",
    height: "1rem",
  },
  ".react-select__value-container.react-select__value-container--is-multi.react-select__value-container--has-value":
    {
      display: "flex",
      gap: "0.35rem",
    },
});

export const StyledValueContainer = styled("div", {
  display: "flex",
  border: "1px solid $grey",
  borderRadius: "8px",
  padding: "0 0.5rem 0 1rem",
});

export const StyledSearchBar = styled("input", {
  background: "$white",
  width: "100%",
  padding: 0,

  "&:focus": {
    outline: "none",
  },
  "& ::placeholder": {
    color: "#BAB8B8",
  },

  "&:read-only::selection": {
    background: "transparent",
  },
});

export const DropdownContainer = styled("div", {
  position: "absolute",
  display: "grid",
  gridTemplateRows: "repeat(1fr)",
  width: "100%",
  zIndex: 20,
  cursor: "default",
  maxHeight: "var(--max-height, 20rem)",
  overflow: "hidden auto",
  "-webkit-user-select": "none",
  backgroundColor: "$white",
  border: "1px solid $grey",
  borderRadius: "6px",
  boxShadow: "$dropdown",

  variants: {
    isMenuOpen: {
      false: {
        borderWidth: 0,
      },
    },

    menuPlacement: {
      top: {
        bottom: "100%",
        left: 0,
      },
      bottom: {
        top: "100%",
        left: 0,
      },
    },
  },
});

export const DropdownItem = styled("button", {
  fontSize: "$base",
  fontWeight: "$400",
  textAlign: "left",
  borderBottom: "1px solid $grey",
  padding: "0.5rem 1.25rem",
  variants: {
    selected: {
      true: {
        background: "rgb(0 0 0 / 10%)",
      },
    },
  },
});

export const MultiSelectedItemsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  paddingBlock: "0.35rem",
  gap: "0.3rem",
  flexWrap: "wrap",
  flex: "1",
});

export const MultiSelectedItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  background: "rgba($rgbSecondary, 0.9)",
  color: "$white",
  paddingLeft: "0.5rem",
  borderRadius: "8px",
  fontSize: "$sm",
  fontWeight: "$400",
});
