import type {
  ButtonSizes,
  ButtonVariants,
  CompoundVariant,
  ButtonColors,
} from "./consts";
import type {
  FontColors,
  FontSizes,
  FontWeights,
  TextCases,
} from "../Typography/types";

export type { ButtonSizes, ButtonVariants, CompoundVariant };

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BaseProps = {
  isLoading?: boolean;
  tooltip?: string;
  children?: React.ReactNode;
  leftIcon?: React.FC;
  rightIcon?: React.FC;
  iconButton?: boolean;
  size?: ButtonSizes;
  as?: "button" | "a" | React.FC;
  noPadding?: boolean;
  typographyProps?: TypographyProps;
} & Omit<ButtonProps, "color">;

export type Props = {
  variant?: ButtonVariants;
  color?: ButtonColors;
} & BaseProps;

type TypographyProps = {
  size?: FontSizes;
  weight?: FontWeights;
  color?: FontColors;
  textCase?: TextCases;
  className?: string;
};
