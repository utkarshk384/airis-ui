export type CheckboxVariant = keyof typeof VARIANTS;

export const VARIANTS = {
  filled: {
    border: "1px solid $grey",
  },
  borderless: {
    border: "none",
    background: "transparent",
  },
};
