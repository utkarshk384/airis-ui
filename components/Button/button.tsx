import React from "react";

/* Components */
import { Spinner } from "./shared";
import { withTooltip } from "./hoc";
import { Text } from "@components/Typography";

/* Styled */
import { StyledButton } from "./styled";

/* Types */
import type { Props } from "./types";

const BaseButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    typographyProps,
    isLoading,
    ...rest
  } = DefaultProps(props);

  return (
    <StyledButton
      ref={ref}
      {...rest}
      disabled={isLoading || rest.disabled}
      data-state={
        rest.disabled ? "disabled" : isLoading ? "disabled " : "active"
      }
    >
      {LeftIcon && <LeftIcon />}
      {typographyProps ? (
        <Text {...typographyProps}>{children}</Text>
      ) : (
        children
      )}
      {RightIcon && <RightIcon />}
      {isLoading && <Spinner />}
    </StyledButton>
  );
});

BaseButton.displayName = "Button";

const DefaultProps = (props: Props) => {
  const defaultProps: Props = {
    ...props,
    color: props.color || "accent",
    iconButton: props.iconButton || false,
    size: props.size || "base",
    variant: props.variant || "solid",
    as: props.as || "button",
    noPadding: props.noPadding || false,
  };

  return defaultProps;
};

export const Button = withTooltip(BaseButton);
