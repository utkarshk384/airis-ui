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

  ".react-select__indicators": {},
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
    borderBottom: "1px solid $grey",
    "&:hover": {
      background: "rgb(0 0 0 / 10%)",
    },
  },
});
