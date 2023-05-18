import type { ButtonSizes, ButtonVariants, CompoundVariant } from "./consts";
import type {
  FontColors,
  FontSizes,
  FontWeights,
  TextCases,
} from "../Typography/types";

export type { ButtonSizes, ButtonVariants, CompoundVariant };

export type Props = {
  children?: React.ReactNode;
  leftIcon?: React.FC;
  rightIcon?: React.FC;
  variant?: ButtonVariants;
  iconButton?: boolean;
  size?: ButtonSizes;
  as?: "button" | "a" | React.FC;
  noPadding?: boolean;
  typographyProps?: TypographyProps;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type TypographyProps = {
  size?: FontSizes;
  weight?: FontWeights;
  color?: FontColors;
  textCase?: TextCases;
  className?: string;
};
