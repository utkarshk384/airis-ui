/* Types */
export type ButtonVariants = keyof typeof BUTTON_VARIANTS;
export type ButtonColors = keyof typeof BUTTON_COLORS;
export type ButtonSizes = keyof typeof BUTTON_SIZES;

type CompoundVariantItem = {
  color?: ButtonColors;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  css: any;
};

export type CompoundVariant = CompoundVariantItem[];

export const BUTTON_SIZES = {
  xs: {
    padding: "0.125rem 0.25rem",
  },
  sm: {
    padding: "0.25rem 0.375rem",
  },
  base: {
    padding: "0.5rem 0.75rem",
  },
  lg: {
    padding: "0.625rem 1rem",
  },
  xl: {
    padding: "0.75rem 1.25rem",
  },
};

export const BUTTON_COLORS = {
  accent: {
    backgroundColor: "$accent",
    color: "#ffffff",
  },
  primary: {
    backgroundColor: "$primary",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "$secondary",
    color: "#ffffff",
  },
};

export const BUTTON_VARIANTS = {
  solid: {
    backgroundColor: "$accent",
    color: "#ffffff",
    "&:disabled": {
      backgroundColor: "$disabled",
      "&:is(p, span)": {
        color: "#000000 !important",
      },
    },
  },
  outline: {
    backgroundColor: "transparent",
    color: "$accent",
    border: "1px solid $accent",
    "&:disabled": {
      borderColor: "$disabled",
      color: "$disabled",
    },
  },
  text: {
    backgroundColor: "transparent",
    color: "$accent",
    "&:disabled": {
      color: "$disabled",
    },
  },
  link: {
    backgroundColor: "transparent",
    color: "$accent",
    textDecoration: "underline",
    "&:disabled": {
      color: "$disabled",
    },
  },
};

const BUTTON_COMPOUND_VARIANTS: CompoundVariant = [];

BUTTON_COMPOUND_VARIANTS.concat(generateVariants("primary"));
BUTTON_COMPOUND_VARIANTS.concat(generateVariants("secondary"));
BUTTON_COMPOUND_VARIANTS.concat(generateVariants("accent"));

export { BUTTON_COMPOUND_VARIANTS };

function generateVariants(color: ButtonColors): CompoundVariant {
  return [
    {
      color,
      variant: "solid",
      css: {
        backgroundColor: `$${color}`,
        color: "#ffffff",
      },
    },
    {
      color,
      variant: "outline",
      css: {
        backgroundColor: "transparent",
        borderColor: `$${color}`,
        color: `$${color}`,
      },
    },
    {
      color,
      variant: "text",
      css: {
        backgroundColor: "transparent",
        color: `$${color}`,
      },
    },
    {
      color,
      variant: "link",
      css: {
        backgroundColor: "transparent",
        color: `$${color}`,
      },
    },
  ];
}
