export type BadgeColors = keyof typeof ColorVariants;
export type BadgeSize = keyof typeof BadgeSizes;

export const ColorVariants = {
  green: {
    background: "$green",
    color: "$white",
  },
  red: {
    background: "$red",
    color: "$white",
  },
  yellow: {
    background: "$yellow",
    color: "$white",
  },
  blue: {
    background: "$blue",
    color: "$white",
  },
  orange: {
    background: "$orange",
    color: "$white",
  },
};

export const BadgeSizes = {
  xs: {
    fontSize: "$xs",
  },
  sm: {
    fontSize: "$sm",
  },
  base: {
    fontSize: "$base",
  },
  lg: {
    fontSize: "$lg",
  },
  xl: {
    fontSize: "$xl",
  },
};
