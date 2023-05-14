import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

/* Components */
import { CheckboxLabel, CheckboxInput, CheckboxContainer } from "./styled";

/* Types */
import type { CheckboxVariant } from "./types";

type Props = {
  children?: React.ReactNode;
  wrapperClassName?: string;
  variant?: CheckboxVariant;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<Props> = (props) => {
  const { children, containerProps, wrapperClassName, rest } =
    DefaultProps(props);

  return (
    <CheckboxLabel className={wrapperClassName} htmlFor={rest.name}>
      <CheckboxInput type="checkbox" {...rest} />
      <CheckboxContainer {...containerProps}>
        {rest.checked && (
          <CheckIcon fill="currentColor" width={16} height={16} />
        )}
      </CheckboxContainer>
      {children}
    </CheckboxLabel>
  );
};

const DefaultProps = (props: Props) => {
  const {
    children,
    wrapperClassName,
    variant = "filled",
    className,
    style,
    ...rest
  } = props;

  const defaultProps = {
    children,
    wrapperClassName,
    rest,
    containerProps: {
      variant,
      checked: rest.checked,
      className,
      style,
    },
  };

  return defaultProps;
};
