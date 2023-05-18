/* Types */
export type ButtonVariants = keyof typeof BUTTON_VARIANTS;
export type ButtonColors = "primary" | "secondary" | "accent";
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

export const BUTTON_VARIANTS = {
  solid: {
    backgroundColor: "$accent !important",
    color: "#ffffff",

    "&:disabled": {
      backgroundColor: "$disabled",
      "&:is(p, span)": {
        color: "#000000 !important",
      },

      "&:hover": {
        backgroundColor: "$disabled",
      },
    },

    "&:hover, &:focus": {
      background: "rgba($rgbAccent, 80%)",
    },
  },
  outline: {
    backgroundColor: "transparent",
    color: "$accent",
    border: "1px solid $accent",

    "&:disabled": {
      borderColor: "$disabled",
      color: "$disabled",
      "&:hover": {
        backgroundColor: "transparent",
        borderColor: "$accent",
      },
    },

    "&:hover, &:focus": {
      background: "rgba($rgbAccent, 30%)",
      borderColor: "rgba($rgbAccent, 30%)",
    },
  },
  text: {
    backgroundColor: "transparent",
    color: "$accent",

    "&:disabled": {
      color: "$disabled",
    },
  },
  icon: {
    backgroundColor: "transparent",
    color: "$grey",

    "&:disabled": {
      color: "$disabled",
      "&:hover": {
        color: "$disabled",
      },
    },

    "&:hover, &:focus": {
      color: "$accent",
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
      variant: "icon",
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
