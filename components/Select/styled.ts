import { css } from "@/styles/stitches";

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
