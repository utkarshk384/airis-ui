import React from "react";

/* Components */
import { Spinner } from "./shared";
import { withTooltip } from "./hoc";
import { Text } from "@components/Typography";

/* Types */
import type { BaseProps } from "./types";

const BaseButton = React.forwardRef<HTMLButtonElement, BaseProps>(
  (props, ref) => {
    const {
      children,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      typographyProps,
      isLoading,
      ...rest
    } = DefaultProps(props);

    return (
      <button
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
      </button>
    );
  }
);

BaseButton.displayName = "Unstyled Button";

const DefaultProps = (props: BaseProps) => {
  const defaultProps: BaseProps = {
    ...props,
    iconButton: props.iconButton || false,
    size: props.size || "base",
    as: props.as || "button",
    noPadding: props.noPadding || false,
  };

  return defaultProps;
};

export const UnstyledButton = withTooltip(BaseButton);
