import React from "react";

/* Styled */
import { StyledButton } from "./styled";

/* Types */
import type { ButtonColors, ButtonSizes, ButtonVariants } from "./types";
import type { FontColors, FontSizes, FontWeights, TextCases } from "../types";
import { Text } from "@components/Typography";

type TypographyProps = {
  size?: FontSizes;
  weight?: FontWeights;
  color?: FontColors;
  textCase?: TextCases;
  className?: string;
};

type Props = {
  children?: React.ReactNode;
  leftIcon?: React.FC;
  rightIcon?: React.FC;
  variant?: ButtonVariants;
  iconButton?: boolean;
  size?: ButtonSizes;
  color?: ButtonColors;
  as?: "button" | "a";
  typographyProps?: TypographyProps;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonComponent = React.FC<Props>;

export const Button: ButtonComponent = (props) => {
  const {
    children,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    typographyProps,
    ...rest
  } = DefaultProps(props);

  return (
    <StyledButton {...rest}>
      {LeftIcon && <LeftIcon />}
      {typographyProps ? (
        <Text {...typographyProps}>{children}</Text>
      ) : (
        children
      )}
      {RightIcon && <RightIcon />}
    </StyledButton>
  );
};

const DefaultProps = (props: Props) => {
  const defaultProps: Props = {
    ...props,
    iconButton: props.iconButton || false,
    color: props.color || "accent",
    size: props.size || "base",
    variant: props.variant || "solid",
    as: props.as || "button",
  };

  return defaultProps;
};
