import React from "react";

/* Styled */
import { StyledButton } from "./styled";
import { withTooltip } from "./hoc";
import { Text } from "@components/Typography";

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
      data-state={rest.disabled ? "disabled" : "active"}
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

const Spinner: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="-mt-1 ml-2 w-4 h-4 border-2 border-white border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

export const Button = withTooltip(BaseButton);
