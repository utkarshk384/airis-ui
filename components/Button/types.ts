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

export type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.FC;
  rightIcon?: React.FC;
  variant?: ButtonVariants;
  iconButton?: boolean;
  size?: ButtonSizes;
  as?: "button" | "a" | React.FC;
  noPadding?: boolean;
  typographyProps?: TypographyProps;
  color?: ButtonColors;
} & Omit<ButtonProps, "color">;

type TypographyProps = {
  size?: FontSizes;
  weight?: FontWeights;
  color?: FontColors;
  textCase?: TextCases;
  className?: string;
};
