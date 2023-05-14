import React from "react";

/* Styled */
import { StyledButton } from "./styled";
import { Text } from "@components/Typography";

/* Types */
import type { Props } from "./types";

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
    size: props.size || "base",
    variant: props.variant || "solid",
    as: props.as || "button",
    noPadding: props.noPadding || false,
  };

  return defaultProps;
};
